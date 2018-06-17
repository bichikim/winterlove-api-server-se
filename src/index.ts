import ApiServer from '@/ApiServer'
import controllers from '@/controllers'
import mongooseSchemas from '@/mongoose-schemas'
import resolvers from '@/resolvers'
import routes from '@/routes'
import typeDefs from '@/type-defs'
import getArgv from '@/util/getArgv'
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
  console.log(
    `key: ${options.key}\n` +
    `cert: ${options.cert}\n` +
    `mongoDB url: ${options.mongoDBUrl}\n` +
    `mode: ${process.env.NODE_ENV}\n` +
    `hapi version: ${version}\n` +
    `${pkg.name()} version: ${pkg.version()}`,
  )
})
