import joigoose from 'joigoose'
import _mongoose  from 'mongoose'
import {Schema} from 'joi'

// grab all schemas
const schemas = require.context('.', false, /\.(ts|js)$/)
interface IOptions {
  mongoose?: boolean
}

export default (schema: string | Schema, options: IOptions = {}) => {
  let mySchema: Schema
  if(typeof schema === 'string'){
    const keys = schemas.keys()
    const jsName = `./${schema}.js`
    const tsName = `./${schema}.ts`
    if(keys.find((key) => (key === jsName))){
      mySchema = schemas(jsName)
    }else if(keys.find((key) => (key === tsName))){
      mySchema = schemas(tsName)
    }else{
      throw new Error(`[schemas] has no ${schema}`)
    }
  }else{
    mySchema = schema as Schema
  }
  if(!mySchema.isJoi){
    throw new Error(`[schemas] ${schema} is not a joi schema`)
  }
  const {mongoose = false} = options
  if(mongoose){
    return joigoose(_mongoose).convert(mySchema)
  }
  return schema
}