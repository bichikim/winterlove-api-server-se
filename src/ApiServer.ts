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
import Hapi, {Server} from 'hapi'
import {ServerRegisterPluginObject} from 'hapi'
import hapiSwagger from 'hapi-swagger'
import inert from 'inert'
import {Schema as JoiSchema} from 'joi'
import mongoose from 'mongoose'
import {resolve} from 'path'
import vision from 'vision'
const className = 'ApiServer'
if(global.__src || global.__root){
  console.warn(`[${className}] global.__src or global.__root is already taken`)
}
global.__src = resolve(__dirname, './')
global.__root = resolve(__dirname, '../')

// const
const ARGV_SKIP = 2

export interface IServerOptions extends IArgvServerOptions{
  jois?: {[name: string]: JoiSchema}
  types?: IGraphqlTypeConfig[]
  routes?: IServerRoute[]
  resolvers?: TResolverFactory[]
  controllers?: {[name: string]: any}
  plugins?: Array<ServerRegisterPluginObject<any>>
  mongooseUrl?: string
}

/**
 * ApiServer constructor Options
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

  register(plugin: any, options?: any): Promise<any>

  start(options?: IServerOptions): Promise<Server>

  stop(options?: {timeout: number}): void
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

  private _server: Server
  get server(): Server {return this._server}

  constructor(options: IServerOptions = {}) {
    const {jois, types, resolvers, mongooseUrl, plugins, controllers, routes,...others} = options
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

  async register(plugin: any, options?: any) {
    const {name = 'unknown'} = getPluginPkg(plugin)
    try{
      await this.server.register({plugin, options})
    }catch(error){

      this.server.log(['error', name, 'register'], 'server cannot resister')
    }
    return (this.server.plugins as any)[name]
  }

  /**
   * start server with options
   * @param {IServerOptions} options
   * @returns {Promise<Server>}
   */
  async start(options: IServerOptions = {}) {
    const {
      key, cert,
      port, host, mongooseUrl, plugins, jois, types, resolvers, controllers, routes,
    } = this._mergeOptions(options)

    const tls = await this._getTsl({key, cert})

    this._server = new Hapi.Server({port, host, tls})

    if(mongooseUrl){await mongoose.connect(String(mongooseUrl))}

    ///////////////////////////////
    // register plugins in start options & server options
    //////////////////////////////
    const registers = []
    for(let plugin of plugins){registers.push(this.register(plugin.plugin), plugin.options)}
    await Promise.all(registers)

    ////////////////////////////
    // register plugins for dev mode
    ///////////////////////////
    if(!this.production){
      // for hapi-Swagger
      await Promise.all([
        this.register(inert),
        this.register(vision),
      ])
    }

    ///////////////////////////
    // register default plugins
    //////////////////////////
    await Promise.all([
      this.register(hapiSwagger, {
        info: {
          title: name(),
          version: version(),
        },
        documentationPage: !this.production,
        swaggerUI: !this.production,
      }),
      // for pm2
      this.register(pm2ZeroDownTime),
    ])

    if(jois && types && resolvers){
      await this.register(mongooseGraphqlJoi, {
        jois, types, resolvers,
      })
    }

    ///////////////////////////
    // register controllersRoutes
    //////////////////////////
    const {db} = await this.register(lowDB)
    // controllers have mongoose.models
    await this.register(controllersRoutes, {
      routes,
      controllers,
      context: {lowDB: db},
    })

    // this.server.route(routes)

    // start server
    try{
      await this.server.start()
    }catch(error){
      this.server.log(['error', 'hapi', 'start'], 'server cannot run')
      throw error
    }

    return this.server
  }

  async stop(options?: {timeout: number}) {
    await this.server.stop(options)
  }

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

  private async _getTsl(options: {key: string, cert: string}): Promise<{key: any, cert: any}> {
    const {key: _key, cert: _cert} = options
    if(_key && _cert){
      return
    }

    let key, cert
    try{
      key = await readFile(_key)
    }catch(error){
      this.server.log(['error', 'server', 'read file', 'key'], `cannot find key at ${_key}`)
      console.error(error)
      return
    }
    try{
      cert = await readFile(_cert)
    }catch(error){
      this.server.log(
        ['error', 'server', 'read file', 'cert'], `cannot find cert at ${_cert}`)
      console.error(error)
      return
    }

    return {
      key, cert,
    }
  }
}
