import {IArgvServerOptions} from '@/getArgv'
import controllersRoutes from '@/plugins/controllers-routes/'
import graphqlHapi, {TResolverFactory} from '@/plugins/graphql-hapi'
import logGood, {IOptions as ILogOptions} from '@/plugins/log-good'
import lowDB from '@/plugins/low-db'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'
import {IServerRoute} from '@/types'
import getPluginPkg from '@/util/getPluginPkg'
import {name, version} from '@/util/pkg'
import {readFile} from 'fs-extra'
import {ITypedef} from 'graphql-tools'
import Hapi, {Plugin, Server} from 'hapi'
import {ServerRegisterPluginObject} from 'hapi'
import {forEach} from 'lodash'
import Mongoose, {Schema} from 'mongoose'
// const
const CLASS_NAME = 'ApiServer'
const DEFAULT_PORT = 8080
const DEFAULT_HOST = 'localhost'

/**
 * ApiServer constructor & start Options
 * Do NOT change update or change to add new Plugins
 * we only allow you to add default plugins in this Api server
 * otherwise use ApiServer.register(...)
 */
export interface IServerOptions extends IArgvServerOptions {
  log?: ILogOptions
  // for graphql
  resolvers?: TResolverFactory[]
  typeDefs?: ITypedef[]
  // for controllers-routes
  controllers?: {[name: string]: any}
  routes?: IServerRoute[]
  // for mongoose
  mongooseSchemas?: {[name: string]: Schema}
  // plugins
  plugins?: Array<ServerRegisterPluginObject<any>>
}

/**
 * ApiServer interface
 */
export interface IAPIServer {
  readonly production: boolean
  readonly cert: string
  readonly controllers: {[name: string]: any}
  readonly host: string
  readonly key: string
  readonly mongoDBUrl: string
  readonly plugins: Array<ServerRegisterPluginObject<any>>
  readonly port: number
  readonly resolvers: TResolverFactory[]
  readonly routes: IServerRoute[]
  readonly server: Server
  readonly typeDefs: ITypedef[]
  readonly mongooseSchemas: {[name: string]: Schema}
  readonly logOptions: ILogOptions

  register(plugin: Plugin<any>, options?: any): IAPIServer
  start(options?: IServerOptions): Promise<{server: Server, options: IServerOptions}>
  stop(options?: {timeout: number}): void
  log(tag: string[], massage: string): void
}

/**
 * Api server
 */
export default class ApiServer implements IAPIServer {
  readonly production: boolean = process.env.NODE_END === 'production'

  readonly cert: string
  readonly controllers: {[name: string]: any}
  readonly host: string
  readonly key: string
  readonly mongoDBUrl: string
  readonly port: number
  readonly resolvers: TResolverFactory[]
  readonly routes: IServerRoute[]
  readonly typeDefs: ITypedef[]
  readonly mongooseSchemas: {[name: string]: Schema}
  readonly logOptions: ILogOptions

  private _logBeforeServerCreate: Array<{tag: string[], massage: string}>

  private _plugins: Array<ServerRegisterPluginObject<any>>
  get plugins(): Array<ServerRegisterPluginObject<any>> {return this._plugins}

  private _server: Server
  get server(): Server {return this._server}

  constructor(options: IServerOptions = {}) {
    const {
      mongoDBUrl, plugins, controllers, routes, mongooseSchemas,
      resolvers, typeDefs, port, host, key, cert, log,
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
    this.mongooseSchemas = mongooseSchemas
    this.logOptions = log
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
  async start(_options: IServerOptions = {}): Promise<{server: Server, options: IServerOptions}> {
    const options = this._mergeOptions(_options)
    const {
      key, cert, typeDefs, resolvers, mongooseSchemas, log,
      port = DEFAULT_PORT, host = DEFAULT_HOST, mongoDBUrl, plugins, controllers, routes,
    } = options
    // key & cert for https
    const tls = await this._getTsl({key, cert})

    // waitingPipe is save all Promise calls.
    // the Promise.all will take the waitingPipe for waiting all calls
    // the reason of using the Promise.all a next await should wait a previous await with out it.
    // but if we use the Promise.all it will run all Promise at ones
    const waitingPipe = []

    this._server = new Hapi.Server({port, host, tls})
    this._registerSchema(mongooseSchemas)

    // run works
    this._afterCreateServer()

    // no mongoose url no using mongoose
    if(mongoDBUrl){
      await Mongoose.connect(mongoDBUrl)
    }

    ///////////////////////////////
    // register plugins in start options & server options
    //////////////////////////////
    waitingPipe.push(this._registerAll(plugins))

    ///////////////////////////
    // register default plugins
    //////////////////////////
    waitingPipe.push(this._registerAll([
      {plugin: pm2ZeroDownTime},
    ]))

    if(log){
      waitingPipe.push(this._register(logGood, log))
    }

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
    // Restful Api
    //////////////////////////
    if(routes && controllers && routes.length > 0){
      // register plugins for dev mode
      waitingPipe.push(
        (async () => {
          const {db} = await this._register(lowDB)
          // controllers have mongoose.models
          await this._register(controllersRoutes, {
            title: name(), version: version(), routes, controllers,
            context: {lowDB: db}, production: this.production,
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
    this.log(['info', 'hapi', 'start'], 'server is started')
    return {server: this.server, options}
  }

  // stop server
  async stop(options?: {timeout: number}) {
    try{
      await this.server.stop(options)
    }catch(error){
      this.log(['error', 'hapi', 'stop'], 'cannot stop hapi')
      throw error
    }
    this.log(['info', 'hapi', 'stop'], 'server is stopped')
    this._server = null
  }

  // solve getting tsl
  private async _getTsl(options: {key: string, cert: string}): Promise<{key: any, cert: any}> {
    const {key: _key, cert: _cert} = options
    if(!_key || !_cert){return}
    let key, cert
    try{
      key = await readFile(_key)
    }catch(error){
      this.log(
        ['error', 'hapi', 'read file', 'tsl'], `cannot find key at ${_key}`)
      throw error
    }
    try{
      cert = await readFile(_cert)
    }catch(error){
      this.log(
        ['error', 'hapi', 'read file', 'tsl'], `cannot find cert at ${_cert}`)
      throw error
    }
    return {key, cert}
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
      cert = this.cert, controllers, host = this.host, key = this.key,
      mongoDBUrl = this.mongoDBUrl, mongooseSchemas = {}, plugins = [], port = this.port,
      routes = [], typeDefs = [], resolvers = [], log = this.logOptions,
    } = options
    return {
      cert, host, key, mongoDBUrl, port, log,
      controllers: this.controllers ?
        Object.assign({}, this.controllers, controllers || {}) : controllers,
      mongooseSchemas: this.mongooseSchemas ?
        Object.assign({}, this.mongooseSchemas, mongooseSchemas || {})
        : mongooseSchemas,
      plugins: plugins.concat(this.plugins || []),
      routes: routes.concat(this.routes || []),
      typeDefs: typeDefs.concat(this.typeDefs || []),
      resolvers: resolvers.concat(this.resolvers || []),
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
      this.log(['info', 'hapi', 'plugin', 'register'], `registered plugin ${name} into server`)
    }catch(error){
      this.log(
        ['error', 'hapi', 'plugin', 'register'],
        `cannot register plugin ${name} into server`,
      )
      throw error
    }
    return (this.server.plugins as any)[name]
  }

  // eslint-disable-next-line class-methods-use-this
  private _registerSchema(schemas: {[name: string]: Schema}) {
    forEach(schemas, (value, name) => {
      Mongoose.model(name, value)
    })
    return Mongoose.models
  }
}
