import controllersRoutes from '@/plugins/controllers-routes/'
import graphqlHapi, {TResolverFactory} from '@/plugins/graphql-hapi'
import lowDB from '@/plugins/low-db'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'
import {IServerRoute} from '@/types'
import {IArgvServerOptions} from '@/util/getArgv'
import getPluginPkg from '@/util/getPluginPkg'
import {name, version} from '@/util/pkg'
import {readFile} from 'fs-extra'
import {ITypedef} from 'graphql-tools'
import Hapi, {Plugin, Server} from 'hapi'
import {ServerRegisterPluginObject} from 'hapi'
import hapiSwagger from 'hapi-swagger'
import inert from 'inert'
import mongoose from 'mongoose'
import vision from 'vision'
// const
const CLASS_NAME = 'ApiServer'

/**
 * ApiServer constructor & start Options
 */
export interface IServerOptions extends IArgvServerOptions {
  // for graphql
  resolvers?: TResolverFactory[]
  typeDefs?: ITypedef[]
  // for controllers-routes
  controllers?: {[name: string]: any}
  routes?: IServerRoute[]
  // for mongoose
  mongooseSchema?: {[name: string]: any}
  // plugins
  plugins?: Array<ServerRegisterPluginObject<any>>
}

/**
 * ApiServer interface
 */
export interface IAPIServer {
  // origin hapi server
  readonly cert: string
  readonly controllers: {[name: string]: any}
  readonly host: string
  readonly key: string
  readonly mongoDBUrl: string
  readonly plugins: Array<ServerRegisterPluginObject<any>>
  readonly port: number
  readonly protocol: string
  readonly resolvers: TResolverFactory[]
  readonly routes: IServerRoute[]
  readonly server: Server
  readonly typeDefs: ITypedef[]

  register(plugin: Plugin<any>, options?: any): IAPIServer
  start(options?: IServerOptions): Promise<Server>
  stop(options?: {timeout: number}): void
  log(tag: string[], massage: string): void
}

/**
 * Api server
 */
export default class ApiServer implements IAPIServer {
  readonly production: boolean =
    !process.env.NODE_END || process.env.NODE_END === 'production'

  readonly cert: string
  readonly controllers: {[name: string]: any}
  readonly host: string
  readonly key: string
  readonly mongoDBUrl: string
  readonly port: number
  readonly protocol: string
  readonly resolvers: TResolverFactory[]
  readonly routes: IServerRoute[]
  readonly typeDefs: ITypedef[]

  private _logBeforeServerCreate: Array<{tag: string[], massage: string}>

  private _plugins: Array<ServerRegisterPluginObject<any>>
  get plugins(): Array<ServerRegisterPluginObject<any>> {return this._plugins}

  private _server: Server
  get server(): Server {return this._server}

  constructor(options: IServerOptions = {}) {
    const {
      mongoDBUrl, plugins, controllers, routes,
      resolvers, typeDefs, port, host, key, cert,
    } = options
    this.cert = cert
    this.controllers = controllers
    this.host = host
    this.key = key
    this.mongoDBUrl = mongoDBUrl
    this._plugins = plugins
    this.port = port
    this.routes = routes
    this.resolvers = resolvers
    this.typeDefs = typeDefs
  }

  // register a plugin before start server
  register(plugin: Plugin<any>, options?: any): IAPIServer {
    if(this.server && this.server.info.started){
      console.warn(
        `[${CLASS_NAME}] cannot register a plugin now` +
        'because server is already started ' +
        'the registering will do after server starting',
      )
    }
    if(!this.plugins){
      this._plugins = []
    }
    this.plugins.push({plugin, options})
    return this
  }

  // server log
  log(tag: string[], massage: string) {
    if(this.server){
      this.server.log(tag, massage)
      return
    }
    if(!this._logBeforeServerCreate){
      this._logBeforeServerCreate = []
    }
    this._logBeforeServerCreate.push({tag, massage})
  }

  // start server with options
  async start(options: IServerOptions = {}) {
    const {
      key, cert, typeDefs, resolvers,
      port, host, mongoDBUrl, plugins, controllers, routes,
    } = this._mergeOptions(options)

    // key & cert for https
    const tls = await this._getTsl({key, cert})

    // waitingPipe is save all Promise calls.
    // the Promise.all will take the waitingPipe for waiting all calls
    // the reason of using the Promise.all a next await should wait a previous await with out it.
    // but if we use the Promise.all it will run all Promise at ones
    const waitingPipe = []

    this._server = new Hapi.Server({port, host, tls})

    // run works
    this._afterCreateServer()

    // no mongoose url no using mongoose
    if(mongoDBUrl){
      await mongoose.connect(mongoDBUrl)
    }

    ///////////////////////////////
    // register plugins in start options & server options
    //////////////////////////////
    waitingPipe.push(this._registerAll(plugins))

    ////////////////////////////
    // register plugins for dev mode
    ///////////////////////////
    if(!this.production){
      // for hapi-Swagger
      waitingPipe.push(this._registerAll([{plugin: inert}, {plugin: vision}]))
    }

    ///////////////////////////
    // register default plugins
    //////////////////////////
    waitingPipe.push(this._register(pm2ZeroDownTime))

    ///////////////////////////
    // graphql
    //////////////////////////
    if(typeDefs && resolvers && typeDefs.length > 0){
      waitingPipe.push(this._register(graphqlHapi, {
        typeDefs,
        resolverFactories: resolvers,
        path: '/graphql',
      }))
    }

    ///////////////////////////
    // register controllersRoutes
    //////////////////////////
    if(routes && controllers){
      waitingPipe.push(this._register(hapiSwagger, {
        info: {
          title: name(),
          version: version(),
        },
        documentationPage: !this.production,
        swaggerUI: !this.production,
      }))
      waitingPipe.push(
        (async () => {
          const {db} = await this._register(lowDB)
          // controllers have mongoose.models
          await this._register(controllersRoutes, {
            routes,
            controllers,
            context: {
              lowDB: db,
            },
          })
        })(),
      )
    }

    // wait all plugin registrations
    await Promise.all(waitingPipe)

    // start server
    try{
      await this.server.start()
    }catch(error){
      this.log(['error', 'hapi', 'start'], 'server cannot run')
      throw error
    }

    this.log(['info', 'hapi', 'start'], 'server start')
    return this.server
  }

  // stop server
  async stop(options?: {timeout: number}) {
    try{
      await this.server.stop(options)
    }catch(error){
      this.log(['error', 'hapi', 'stop'], 'cannot stop hapi')
      throw error
    }
    this.log(['info', 'hapi', 'stop'], 'server stop')
    this._server = null
  }

  // solve getting tsl
  private async _getTsl(options: {key: string, cert: string}): Promise<{key: any, cert: any}> {
    const {key: _key, cert: _cert} = options
    if(!_key || !_cert){
      return
    }

    let key, cert
    try{
      key = await readFile(_key)
    }catch(error){
      this.log(
        ['error', 'server', 'read file', 'key'], `cannot find key at ${_key}`)
      console.error(error)
      return
    }
    try{
      cert = await readFile(_cert)
    }catch(error){
      this.log(
        ['error', 'server', 'read file', 'cert'], `cannot find cert at ${_cert}`)
      console.error(error)
      return
    }

    return {
      key, cert,
    }
  }

  // server log all logs
  private _logAll(logs?: Array<{tag: string[], massage: string}>) {
    if(!logs){return}
    logs.forEach((log: {tag: string[], massage: string}) => {
      this.server.log(log.tag, log.massage)
    })
  }

  // life cycle for afterCreateServer
  private _afterCreateServer() {
    // save logs that is made before server creating
    this._logAll(this._logBeforeServerCreate)
    this._logBeforeServerCreate = null
  }

  // merge options with this options
  private _mergeOptions(options: IServerOptions) {
    const {
      // jois,
      // resolvers,
      cert = this.cert,
      controllers,
      host = this.host,
      key = this.key,
      mongoDBUrl = this.mongoDBUrl,
      plugins = [],
      port = this.port,
      routes = [],
      typeDefs = [],
      resolvers = [],
      // types,
    } = options
    return {
      // jois: this.jois ? Object.assign({}, this.jois, jois || {}) : jois,
      // resolvers: this.resolvers ? [...this.resolvers].concat(resolvers || []) : resolvers,
      cert,
      controllers: this.controllers ?
        Object.assign({}, this.controllers, controllers || {}) : controllers,
      host,
      key,
      mongoDBUrl,
      plugins: plugins.concat(this.plugins || []),
      port,
      routes: routes.concat(this.routes || []),
      typeDefs: typeDefs.concat(this.typeDefs || []),
      resolvers: resolvers.concat(this.resolvers || []),
      // types: this.types ? [...this.types].concat(types || []) : types,
    }
  }

  // register all plugins
  private async _registerAll(plugins?: Array<{plugin: Plugin<any>, options?: any}>) {
    if(!plugins){return}
    await Promise.all(plugins.map((plugin) => {
      return this._register(plugin.plugin, plugin.options)
    }))
  }

  // register one plugins it will return exposed value & log when registration has an error
  private async _register(plugin: Plugin<any>, options?: any) {
    const {name = 'unknown'} = getPluginPkg(plugin)
    try{
      await this.server.register({plugin, options})
    }catch(error){
      this.log(['error', name, 'register'], 'server cannot resister')
      throw error
    }
    return (this.server.plugins as any)[name]
  }
}
