import ApiServer from '@/ApiServer'
import controllers from '@/controllers'
import routes from '@/routes'
import * as pkg from '@/util/pkg'
import {Server} from 'hapi'

const server = new ApiServer({
  controllers,
  routes,
})

server.start().then((server: Server) => {
  const {version, info: {protocol, address, port} = {} as any} = server
  console.log(
    `Server is running for ${protocol}://${address}:${port}\n` +
      `mode: ${process.env.NODE_ENV}\n` +
      `hapi version: ${version}\n` +
      `${pkg.name()} version: ${pkg.version()}`,
  )
})
