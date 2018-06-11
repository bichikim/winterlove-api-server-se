import {name} from '@/util/file-name'
import {graphiqlHapi, graphqlHapi} from 'apollo-server-hapi'
import {IResolvers, makeExecutableSchema} from 'graphql-tools'
import {Plugin, Server} from 'hapi'
import {Schema as JoiSchema} from 'joi'
import Joigoose from 'joigoose'
import {forEach, upperFirst} from 'lodash'
import Mongoose, {Model, Schema} from 'mongoose'
import createType, {ConfigurationObject} from 'mongoose-schema-to-graphql'
import {join} from 'path'
const joigoose = Joigoose(Mongoose)
type TResolverFactory = (models: {[name: string]: Model<any>}) => IResolvers
interface IOptions {
  location?: string
  schemasPath?: string
  types?: ConfigurationObject[]
  path?: string
  resolvers?: TResolverFactory | TResolverFactory[]
  graphiqlHapi?: boolean
}
const pluginName = 'mongoose-graphql-joi'
const plugin: Plugin<IOptions> = {
  name: pluginName,
  version: '0.0.1',
  register: async (server: Server, options: IOptions = {}) => {
    const {
      schemasPath = './models',
      types = [],
      location = 'mongodb://localhost:27017/db',
      path = '/graphql',
      graphiqlHapi: isGraphiqlHapi = false,
      resolvers,
    } = options

    // resolvers check
    if(!resolvers){
      throw new Error(`[${pluginName}] options should have resolvers`)
    }
    // defined objects
    const jois: {[name: string]: JoiSchema} = collectJois(schemasPath)
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

    // connect mongoose
    try{
      await Mongoose.connect(location)
    }catch(error){
      // won't throw error
      server.log(['error', 'mongoose', 'connect'], 'connecting mongoDB is failure')
    }

    const expose = {jois, schemas, models, types: _types}
    Object.freeze(expose)
    server.expose(expose)
  },
}

function collectJois(path: string): {[name: string]: JoiSchema} {
  const jois: {[name: string]: JoiSchema} = {}
  const joisContext = require.context(
    join(global.__src, path), false, /^(?!.*\.spec\.(js|ts)$).*\.(js|ts)$/,
  )
  joisContext.keys().forEach((fileName: string) => {
    const key: string =  name(fileName)
    if('index' !== key){
      jois[key] = joisContext(fileName)
    }
  })
  return jois
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
  types: ConfigurationObject[],
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
  resolvers: TResolverFactory | TResolverFactory[],
  models: {[name: string]: Model<any>},
) {
  const _resolvers: IResolvers[] = []
  if(Array.isArray(resolvers)){
    resolvers.forEach((resolver) => {
      _resolvers.push(resolver(models))
    })
  }else{
    _resolvers.push(resolvers(models))
  }
  return _resolvers
}

export default plugin
