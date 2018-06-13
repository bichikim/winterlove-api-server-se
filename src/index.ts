import ApiServer from '@/ApiServer'
import controllers from '@/controllers'
import resolvers from '@/graphql-resolvers'
import types from '@/graphql-types'
import routes from '@/routes'
import Docs from '@/schemas/docs'
import * as pkg from '@/util/pkg'
import {Server} from 'hapi'

const server = new ApiServer({
  controllers,
  jois: {Docs},
  resolvers,
  routes,
  types,
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
