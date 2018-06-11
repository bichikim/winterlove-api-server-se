import Mongoose from 'mongoose'
import joigoose from 'joigoose'
import {Schema} from 'joi'
const Joigoose = joigoose(Mongoose)

export function mongooseSchema(joi: Schema) {
  return new Mongoose.Schema(Joigoose.convert(joi))
}

export function mongooseModel(name: string, joi: Schema) {
  const schema = mongooseSchema(joi)
  return Mongoose.model(name, schema)
}