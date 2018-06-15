import ApiServer from '@/ApiServer'
import controllers from '@/controllers'
import resolvers from '@/resolvers'
import routes from '@/routes'
import typeDefs from '@/type-defs'
import getArgv from '@/util/getArgv'
import * as pkg from '@/util/pkg'
import {Server} from 'hapi'
const ARGV_SKIP = 2

const config = getArgv(process.argv.slice(ARGV_SKIP))
console.log(
  'config options \n' +
  `port: ${config.port}\n` +
  `host: ${config.host}\n` +
  `cert: ${config.cert}\n` +
  `mongoDBUrl: ${config.mongoDBUrl}\n`,
)

const server = new ApiServer({
  ...config,
  resolvers,
  typeDefs,
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
