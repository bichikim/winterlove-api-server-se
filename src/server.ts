import controllersRoutes from '@/plugins/controllers-routes/'
import lowDB from '@/plugins/low-db'
import pm2ZeroDownTime from '@/plugins/pm2-zero-down-time'
import routes from '@/routes'
import getArgv from '@/util/getArgv'
import Hapi, {Server} from 'hapi'
import good from 'good'

export async function start() {
  const serverOptions = getArgv(process.argv.slice(2))
  // const listener = getListener(serverOptions)
  const {port, host} = serverOptions
  const server: Server = new Hapi.Server({
    // listener: listener as any,
    port, host,
  })


  try{
    await server.register({plugin: good})
  }catch(error){
    server.log(['error', 'good', 'register'], 'server cannot resister')
    throw error
  }

  try{
    await server.register({plugin: pm2ZeroDownTime})
  }catch(error){
    server.log(['error', 'pm2-zero-down-time', 'register'], 'server cannot resister')
    throw error
  }

  try{
    await server.register({plugin: lowDB})
  }catch(error){
    server.log(['error', 'low-db', 'register'], 'server cannot resister')
    throw error
  }


  const plugins: any = server.plugins

  try{
    await server.register({plugin: controllersRoutes, options: {
      routes,
      context: {
        lowDB: plugins.lowDB.db,
      },
    }})
  }catch(error){
    server.log(['error', 'controllers-routes', 'register'], 'server cannot resister')
    throw error
  }

  //
  // try{
  //   await server.register({plugin: hapiSwagger, options: {
  //     info: {
  //       title: name(),
  //       version: version(),
  //     },
  //   }})
  // }catch(error){
  //   server.log(['error', 'hapi-swagger', 'register'], 'server cannot resister')
  //   throw error
  // }

  try{
    await server.start()
  }catch(error){
    server.log(['error', 'hapi', 'start'], 'server cannot run')
    throw error
  }

  return server
}

export async function stop(server: Server, options?: {timeout: number}) {
  await server.stop(options)
}
