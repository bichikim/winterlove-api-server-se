import {Server} from 'hapi'
import APIServer from '@/APIServer'
import {name, version} from '@/util/pkg'

const server = new APIServer()

server.start().then((server: Server) => {
  if(process.env.NODE_ENV === 'production'){return}
  console.log(
    `Server is running for ${server.info.protocol}://${server.info.address}:${server.info.port}\n` +
    `hapi version: ${server.version}\n` +
    `${name()} version: ${version()}`,
  )
})