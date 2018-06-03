import Hapi, {Server} from 'hapi'
import getArgv from '@/util/getArgv'
import routes from '@/routes'
import jsonDB from '@/plugins/low-db'
import controllersRoutes from '@/plugins/controllers-routes'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'

export async function start() {
  const serverOptions = getArgv(process.argv.slice(2))
  // const listener = getListener(serverOptions)
  const {port, host} = serverOptions
  const server: Server = new Hapi.Server({
    // listener: listener as any,
    port, host,
  })

  await server.register({plugin: pm2ZeroDownTime})

  await server.register({plugin: jsonDB})

  const plugins: any = server.plugins

  await server.register({plugin: controllersRoutes, options: {
    routes,
    context: {
      lowDB: plugins.lowDB.db,
    }
  }})

  await server.start()

  return server
}

export async function stop(server: Server, options?: {timeout: number}) {
  await server.stop(options)
}