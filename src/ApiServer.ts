import controllersRoutes from '@/plugins/controllers-routes/'
import lowDB from '@/plugins/low-db'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'
import routes from '@/routes'
import {IAPIServer} from '@/types'
import getArgv from '@/util/getArgv'
import getPluginPkg from '@/util/getPluginPkg'
import {name, version} from '@/util/pkg'
import Hapi, {Server} from 'hapi'
import hapiSwagger from 'hapi-swagger'
import inert from 'inert'
import vision from 'vision'
const ARGV_SKIP = 2

class ApiServer implements IAPIServer {
  public readonly server: Server
  public readonly production: boolean

  constructor(options: any = {}) {
    const serverOptions = Object.assign(getArgv(process.argv.slice(ARGV_SKIP)), options)
    const {port, host} = serverOptions
    this.server = new Hapi.Server({
      port, host,
    })
    this.production = !process.env.NODE_END || process.env.NODE_END === 'production'
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

  async start() {

    // this is for dev mode
    if(!this.production){
      // for hapi-Swagger
      await Promise.all([
        this.register(inert),
        this.register(vision),
        this.register(hapiSwagger, {
          info: {
            title: name(),
            version: version(),
          },
        }),
      ])
    }

    // for pm2
    await this.register(pm2ZeroDownTime)

    const {db} = await this.register(lowDB)
    await this.register(controllersRoutes, {routes, context: {lowDB: db}})

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

}

export default ApiServer