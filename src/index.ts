import ApiServer from '@/ApiServer'
import controllers from '@/controllers'
import getArgv from '@/getArgv'
import mongooseSchemas from '@/mongoose-schemas'
import resolvers from '@/resolvers'
import routes from '@/routes'
import typeDefs from '@/type-defs'
import * as pkg from '@/util/pkg'
const ARGV_SKIP = 2

// collecting configs from process.argv and process.env and process.envJS (from build)
const config = getArgv(process.argv.slice(ARGV_SKIP))

// init server
const server = new ApiServer({
  ...config,
  mongooseSchemas,
  resolvers,
  typeDefs,
  controllers,
  routes,
})

// start server
server.start().then(({server, options}) => {
  const {version} = server
  const {key, cert, port, log, mongoDBUrl} = options
  console.log(
    `key: ${key}\n` +
    `cert: ${cert}\n` +
    `port: ${port}\n` +
    `log.screen: ${log.screen}\n` +
    `log.file: ${log.file}\n` +
    `log.loggly: ${log.loggly}\n` +
    `mongoDB url: ${mongoDBUrl}\n` +
    `mode: ${process.env.NODE_ENV}\n` +
    `hapi version: ${version}\n` +
    `${pkg.name()} version: ${pkg.version()}`,
  )
})
