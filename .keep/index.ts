import {name} from '@/util/file-name'
import Joigoose from 'joigoose'
import {forEach, upperFirst} from 'lodash'
import Mongoose from 'mongoose'
const joisContext = require.context('.', false, /^(?!.*\.spec\.(js|ts)$).*\.(js|ts)$/)
const jois: any = {}
joisContext.keys().forEach((fileName: string) => {
  const key: string =  name(fileName)
  if('index' !== key){
    jois[key] = joisContext(fileName)
  }
})

const joigoose = Joigoose(Mongoose)
const schemas: any = {}
forEach(jois, (joi: any, name: string) => {
  const joiDefault = joi.default || joi
  if(!joiDefault){
    throw new Error(`[models] ${name} has no default`)
  }
  schemas[name] = new Mongoose.Schema(joigoose.convert(joiDefault))
})

const models: any = {}
forEach(schemas, (schema: any, name: string) => {
  const upperName = upperFirst(name)
  models[upperName] = Mongoose.models[upperName] || Mongoose.model(upperName, schema)
})

const result = {
  jois,
  schemas,
  models,
}

Object.freeze(result)

export default result
