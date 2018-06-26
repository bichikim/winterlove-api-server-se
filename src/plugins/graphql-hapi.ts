import {graphiqlHapi, graphqlHapi} from 'apollo-server-hapi'
import {GraphQLSchema} from 'graphql'
import {
  addMockFunctionsToSchema,
  IResolvers,
  ITypedef,
  makeExecutableSchema,
  mergeSchemas,
} from 'graphql-tools'
import {Plugin, Server} from 'hapi'
import Mongoose, {Model} from 'mongoose'

export type TResolverFactory = (models: {[name: string]: Model<any>}) => IResolvers | IResolvers

interface IOptions {
  typeDefs: ITypedef[]
  resolverFactories: TResolverFactory[]
  context: {[name: string]: any}
  path?: string
  graphiql?: boolean
  route: any
}

const PLUGIN_NAME = 'graphql-hapi'
const plugin: Plugin<IOptions> = {
  name: PLUGIN_NAME,
  version: '0.0.1',
  register: async (server: Server, options: IOptions) => {
    const {
      typeDefs, resolverFactories = [], path = 'graphql', context: _context,
      graphiql = process.env.NODE_ENV === 'development',
      route = {},
    } = options
    const context = {
      ..._context,
      get models() {
        return Mongoose.models
      },
    }
    Object.freeze(context)
    let resolvers: IResolvers[], schema: GraphQLSchema
    try{
      resolvers = executeResolverFactories(resolverFactories, context)
      schema = mergeSchemas({schemas: makeExecutableSchemas(typeDefs), resolvers})
    }catch(error){
      throw error
    }

    try{
      await server.register({
        plugin: graphqlHapi,
        options: {
          path,
          graphqlOptions: {
            context,
            schema,
          },
          route: {
            // for hapi swagger
            description: 'graphql',
            notes: 'graphql endpoint',
            tags: ['graphql'],
            // override route
            ...route,
          },
        },
      })
    }catch(error){
      server.log(['error', PLUGIN_NAME, 'register'], 'error register graphgl-hapi')
    }
    if(graphiql){
      await server.register({
        plugin: graphiqlHapi,
        options: {
          path: '/graphiql',
          graphiqlOptions: {
            endpointURL: '/graphql',
          },
        },
      })
    }
  },
}

function executeResolverFactories(
  resolvers: TResolverFactory[],
  context: {models: {[name: string]: Model<any>}, [name: string]: any},
) {
  const _resolvers: IResolvers[] = []
  resolvers.forEach((resolver) => {
    // TResolverFactory can be both function or IResolvers
    if(typeof resolver === 'function'){
      _resolvers.push(resolver(context))
      return
    }
    _resolvers.push(resolver)
  })
  return _resolvers
}

function makeExecutableSchemas(typeDefs: any[]) {
  const mockFunctionedExecutableSchema: any[] = []
  typeDefs.forEach((value: any) => {
    const executableSchema = makeExecutableSchema({typeDefs: value})
    addMockFunctionsToSchema({schema: executableSchema})
    mockFunctionedExecutableSchema.push(executableSchema)
  })
  return mockFunctionedExecutableSchema
}

export default plugin
