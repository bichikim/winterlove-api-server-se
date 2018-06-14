import {graphiqlHapi, graphqlHapi} from 'apollo-server-hapi'
import {IResolvers, makeExecutableSchema} from 'graphql-tools'
import {Plugin, Server} from 'hapi'
import Mongoose, {Model} from 'mongoose'

export type TResolverFactory = (models: {[name: string]: Model<any>}) => IResolvers

interface IOptions {
  typeDefs: any[] | any
  resolverFactories: TResolverFactory[]
  cors?: boolean
  path?: string
  graphiql?: boolean
}

const PLUGIN_NAME = 'graphql-hapi'
const plugin: Plugin<IOptions> = {
  name: PLUGIN_NAME,
  version: '0.0.1',
  register: async (server: Server, options: IOptions) => {
    const {
      typeDefs, resolverFactories, path = 'graphql', cors = true,
      graphiql = process.env.NODE_ENV === 'development',
    } = options
    const {models} = Mongoose
    const resolvers = executeResolverFactories(resolverFactories, models)
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    })
    try{
      await server.register({
        plugin: graphqlHapi,
        options: {
          path,
          graphqlOptions: {
            schema,
          },
          route: {
            cors,
          },
        },
      })
    }catch(error){
      server.log(['error', PLUGIN_NAME, 'register'], 'error register graphgl-hapi')
    }
    if(graphiql){
      await server.register(graphiqlHapi)
    }
  },
}

function executeResolverFactories(
  resolvers: TResolverFactory[],
  models: {[name: string]: Model<any>},
) {
  const _resolvers: IResolvers[] = []
  resolvers.forEach((resolver) => {
    _resolvers.push(resolver(models))
  })
  return _resolvers
}

export default plugin
