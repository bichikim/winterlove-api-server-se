import ApiServer from '@/ApiServer'
import DocsResolvers from '@/resolvers/docs'
import Docs from '@/schemas/docs'
import DocsType from '@/types/docs'
import * as pkg from '@/util/pkg'
import {Server} from 'hapi'

const server = new ApiServer({
  jois: {Docs},
  resolvers: [DocsResolvers],
  types: [DocsType],
})

server.start().then((server: Server) => {
  if(process.env.NODE_ENV === 'production'){return}
  const {version, info: {protocol, address, port} = {} as any} = server
  console.log(
    `Server is running for ${protocol}://${address}:${port}\n` +
    `hapi version: ${version}\n` +
    `${pkg.name()} version: ${pkg.version()}`,
  )
})
