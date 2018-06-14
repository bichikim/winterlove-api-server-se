import {graphiqlHapi, graphqlHapi} from 'apollo-server-hapi'
import {IResolvers, makeExecutableSchema} from 'graphql-tools'
import {Plugin, Server} from 'hapi'
import {Schema as JoiSchema} from 'joi'
import Joigoose from 'joigoose'
import {forEach, upperFirst} from 'lodash'
import Mongoose, {Model, Schema} from 'mongoose'
import createType, {
  ExtendFieldType,
  ObjectKeyStringValueAnyType,
} from 'mongoose-schema-to-graphql'
const joigoose = Joigoose(Mongoose)
export type TResolverFactory = (models: {[name: string]: Model<any>}) => IResolvers
interface IOptions {
  jois: {[name: string]: JoiSchema}
  types: IGraphqlTypeConfig[]
  resolvers: TResolverFactory[]
  path?: string
  graphiqlHapi?: boolean
}

export interface IGraphqlTypeConfig {
  name: string
  description?: string
  class: string
  schema: Mongoose.Schema | string
  exclude?: RegExp | string[]
  extend?: ExtendFieldType
  fields?: ObjectKeyStringValueAnyType
}

const pluginName = 'mongoose-graphql-joi'
const plugin: Plugin<IOptions> = {
  name: pluginName,
  version: '0.0.1',
  register: async (server: Server, options: IOptions) => {
    const {
      types, jois, resolvers,
      path = '/graphql',
      graphiqlHapi: isGraphiqlHapi = false,
    } = options

    // resolvers check
    // defined objects
    const schemas: {[name: string]: Schema} = collectMongooseSchema(jois)
    const models: {[name: string]: Model<any>} = collectMongooseModels(schemas)
    const _types: any[] = collectGraphqlTypes(schemas, types)

    const executableSchema = makeExecutableSchema({
      typeDefs: _types,
      resolvers: executeResolverFactories(resolvers, models),
    })

    await server.register({
      plugin: graphqlHapi,
      options: {
        path,
        graphqlOptions: {
          schema: executableSchema,
        },
        route: {
          cors: true,
        },
      },
    })

    if(isGraphiqlHapi){
      await server.register(graphiqlHapi)
    }

    const expose = {jois, schemas, models, types: _types}
    Object.freeze(expose)
    server.expose(expose)
  },
}

function collectMongooseSchema(jois: {[name: string]: JoiSchema}): {[name: string]: Schema} {
  const schemas: {[name: string]: Schema} = {}
  forEach(jois, (joi: any, name: string) => {
    const joiDefault = joi.default || joi
    if(!joiDefault){
      throw new Error(`[${pluginName}] ${name} has no default`)
    }
    schemas[name] = new Mongoose.Schema(joigoose.convert(joiDefault))
  })
  return schemas
}

function collectMongooseModels(schemas: {[name: string]: Schema}): {[name: string]: Model<any>} {
  const models: {[name: string]: Model<any>} = {}
  forEach(schemas, (schema: any, name: string) => {
    const upperName: string = upperFirst(name)
    models[upperName] = Mongoose.models[upperName] || Mongoose.model(upperName, schema)
  })
  return models
}

function collectGraphqlTypes(
  schemas: {[name: string]: Schema},
  types: IGraphqlTypeConfig[],
): any[] {
  const _types: any[] = []
  forEach(types, (typeOptions: any) => {
    const {schema, ...others} = typeOptions
    const {name} = typeOptions
    if(!schema || !name){return true}
    _types.push(createType({
      ...others,
      schema: schemas[schema],
    }))
  })
  return _types
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
