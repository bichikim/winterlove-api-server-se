import Hapi, {Server} from 'hapi'
import {getArgv} from '@/util.js'
import routes from '@/routes'

export async function start() {
  const serverOptions = getArgv(process.argv.slice(2))
  // const listener = getListener(serverOptions)
  const {port, host} = serverOptions
  const server: Server = new Hapi.Server({
    // listener: listener as any,
    port, host,
  })

  server.route(routes)

  await server.start()

  return server
}

export function stop(server: Server) {
  console.log(server.info.address)
}