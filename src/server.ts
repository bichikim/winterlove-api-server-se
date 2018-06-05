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
const SKIP = 2

async function register(
  server: Server,
  plugin: any, options?: any) {
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
    await server.register({plugin, options})
  }catch(error){

    server.log(['error', _name, 'register'], 'server cannot resister')
  }
  return (server.plugins as any)[_name]
}

export async function start() {
  const serverOptions = getArgv(process.argv.slice(SKIP))
  // const listener = getListener(serverOptions)
  const {port, host} = serverOptions
  const server: Server = new Hapi.Server({
    // listener: listener as any,
    port, host,
  })

  await register(server, inert)
  await register(server, vision)
  await register(server, pm2ZeroDownTime)
  const {db} = await register(server, lowDB)
  await register(server, controllersRoutes, {routes, context: {lowDB: db}})
  await register(server, hapiSwagger, {
    info: {
      title: name(),
      version: version(),
    },
  })

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
