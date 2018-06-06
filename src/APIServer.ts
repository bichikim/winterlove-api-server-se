import controllersRoutes from '@/plugins/controllers-routes/'
import lowDB from '@/plugins/low-db'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'
import routes from '@/routes'
import getArgv from '@/util/getArgv'
import {name, version} from '@/util/pkg'
import Hapi, {Server} from 'hapi'
import hapiSwagger from 'hapi-swagger'
import inert from 'inert'
import vision from 'vision'
const ARGV_SKIP = 2

export interface IAPIServer {
  readonly server: Server

  register(plugin: any, options?: any): Promise<any>

  start(): Promise<Server>

  stop(options?: {timeout: number}): void
}

class APIServer implements IAPIServer {
  public readonly server: Server

  constructor(options: any = {}) {
    const serverOptions = Object.assign(getArgv(process.argv.slice(ARGV_SKIP)), options)
    const {port, host} = serverOptions
    this.server = new Hapi.Server({
      port, host,
    })
  }

  async register(plugin: any, options?: any) {
    let _name
    const {name} = plugin
    if(name){
      _name = name
    }else if(plugin.plugin){
      if(plugin.plugin.name){
        _name = plugin.plugin.name
      }else{
        _name = plugin.plugin.pkg.name
      }
    }else{
      _name = 'unknown'
    }
    try{
      await this.server.register({plugin, options})
    }catch(error){

      this.server.log(['error', _name, 'register'], 'server cannot resister')
    }
    return (this.server.plugins as any)[_name]
  }

  async start() {
    await Promise.all([
      this.register(inert),
      this.register(vision),
      this.register(pm2ZeroDownTime),
    ])

    const {db} = await this.register(lowDB)
    await this.register(controllersRoutes, {routes, context: {lowDB: db}})

    await this.register(hapiSwagger, {
      info: {
        title: name(),
        version: version(),
      },
    })

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

}

export default APIServer