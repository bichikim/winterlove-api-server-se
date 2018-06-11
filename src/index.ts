import ApiServer from '@/ApiServer'
import * as pkg from '@/util/pkg'
import {Server} from 'hapi'

const server = new ApiServer()

server.start({mongoose: false}).then((server: Server) => {
  if(process.env.NODE_ENV === 'production'){return}
  const {version, info: {protocol, address, port} = {} as any} = server
  console.log(
    `Server is running for ${protocol}://${address}:${port}\n` +
    `hapi version: ${version}\n` +
    `${pkg.name()} version: ${pkg.version()}`,
  )
})
