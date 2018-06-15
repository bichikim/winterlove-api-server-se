import {Schema} from 'mongoose'

export default new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  ok: {type: String, required: true},
  time: {type: String, required: true},
})
