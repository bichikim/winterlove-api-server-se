import controllersRoutes from '@/plugins/controllers-routes/'
import lowDB from '@/plugins/low-db'
import mongooseGraphqlJoi, {
  IGraphqlTypeConfig,
  TResolverFactory,
} from '@/plugins/mongoose-graphql-joi'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'
import {IServerRoute} from '@/types'
import getArgv, {IArgvServerOptions} from '@/util/getArgv'
import getPluginPkg from '@/util/getPluginPkg'
import {name, version} from '@/util/pkg'
import {readFile} from 'fs-extra'
import Hapi, {Plugin, Server} from 'hapi'
import {ServerRegisterPluginObject} from 'hapi'
import hapiSwagger from 'hapi-swagger'
import inert from 'inert'
import {Schema as JoiSchema} from 'joi'
import mongoose from 'mongoose'
import vision from 'vision'
// const
const ARGV_SKIP = 2
const CLASS_NAME = 'ApiServer'

/**
 * ApiServer constructor & start Options
 */
export interface IServerOptions extends IArgvServerOptions {
  controllers?: {[name: string]: any}
  jois?: {[name: string]: JoiSchema}
  mongooseUrl?: string
  plugins?: Array<ServerRegisterPluginObject<any>>
  resolvers?: TResolverFactory[]
  routes?: IServerRoute[]
  types?: IGraphqlTypeConfig[]
}

/**
 * ApiServer interface
 */
export interface IAPIServer {
  // origin hapi server
  readonly server: Server
  readonly cert: string
  readonly host: string
  readonly jois: {[name: string]: JoiSchema}
  readonly key: string
  readonly mongooseUrl: string
  readonly plugins: Array<ServerRegisterPluginObject<any>>
  readonly port: number
  readonly protocol: string
  readonly resolvers: TResolverFactory[]
  readonly types: IGraphqlTypeConfig[]
  readonly routes: IServerRoute[]
  readonly controllers: {[name: string]: any}

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
  readonly jois: {[name: string]: JoiSchema}
  readonly key: string
  readonly mongooseUrl: string
  readonly plugins: Array<ServerRegisterPluginObject<any>>
  readonly port: number
  readonly protocol: string
  readonly resolvers: TResolverFactory[]
  readonly routes: IServerRoute[]
  readonly types: IGraphqlTypeConfig[]

  private _logBeforeServerCreate: Array<{tag: string[], massage: string}>
  private _registerBeforeServerStart: Array<{plugin: Plugin<any>, options: any}>

  private _server: Server
  get server(): Server {return this._server}

  constructor(options: IServerOptions = {}) {
    const {jois, types, resolvers, mongooseUrl, plugins, controllers, routes, ...others} = options
    const serverOptions = Object.assign(others, getArgv(process.argv.slice(ARGV_SKIP)))
    const {port, host, protocol, key, cert} = serverOptions

    this.cert = cert
    this.controllers = controllers
    this.host = host
    this.jois = jois
    this.key = key
    this.mongooseUrl = mongooseUrl
    this.plugins = plugins
    this.port = port
    this.protocol = protocol
    this.resolvers = resolvers
    this.routes = routes
    this.types = types
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
    if(!this._registerBeforeServerStart){
      this._registerBeforeServerStart = []
    }
    this._registerBeforeServerStart.push({plugin, options})
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
      key, cert,
      port, host, mongooseUrl, plugins, jois, types, resolvers, controllers, routes,
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
    await this._afterCreateServer()

    // no mongoose url no using mongoose
    if(mongooseUrl){
      waitingPipe.push(mongoose.connect(String(mongooseUrl)))
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
    waitingPipe.push(this._registerAll([
      {plugin: hapiSwagger, options: {
        info: {
          title: name(),
          version: version(),
        },
        documentationPage: !this.production,
        swaggerUI: !this.production,
      }},
      {plugin: pm2ZeroDownTime},
    ]))

    if(jois && types && resolvers){
      waitingPipe.push(this._register(mongooseGraphqlJoi, {
        jois, types, resolvers,
      }))
    }

    ///////////////////////////
    // register controllersRoutes
    //////////////////////////
    waitingPipe.push((async () => {
      const {db} = await this._register(lowDB)
      // controllers have mongoose.models
      await this._register(controllersRoutes, {
        routes,
        controllers,
        context: {lowDB: db},
      })
    })())

    // wait all plugin registrations
    await Promise.all(waitingPipe)

    // start server
    try{
      await this.server.start()
    }catch(error){
      this.log(['error', 'hapi', 'start'], 'server cannot run')
      throw error
    }

    return this.server
  }

  // stop server
  async stop(options?: {timeout: number}) {
    await this.server.stop(options)
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
  private async _afterCreateServer() {
    // save logs that is made before server creating
    this._logAll(this._logBeforeServerCreate)
    this._logBeforeServerCreate = null

    // register plugins that id registered before server creating
    await this._registerAll(this._registerBeforeServerStart)
    this._registerBeforeServerStart = null
  }

  // merge options with this options
  private _mergeOptions(options: IServerOptions) {
    const {
      cert = this.cert,
      host = this.host,
      jois,
      key = this.key,
      mongooseUrl = this.mongooseUrl,
      plugins = [],
      port = this.port,
      protocol = this.protocol,
      resolvers,
      controllers,
      routes = [],
      types,
    } = options
    return {
      cert,
      controllers: this.controllers ?
        Object.assign({}, this.controllers, controllers || {}) : controllers,
      host,
      jois: this.jois ? Object.assign({}, this.jois, jois || {}) : jois,
      key,
      mongooseUrl,
      plugins: plugins.concat(this.plugins || []),
      port,
      protocol,
      resolvers: this.resolvers ? [...this.resolvers].concat(resolvers || []) : resolvers,
      routes: routes.concat(this.routes || []),
      types: this.types ? [...this.types].concat(types || []) : types,
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
    }
    return (this.server.plugins as any)[name]
  }
}
