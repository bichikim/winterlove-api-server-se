import {boolean, object, string} from 'joi'

export const title = string()
export const description = string()
export const ok = boolean()

export const doc = object({
  title: title.required(),
  description: description.required(),
  ok,
})

export default doc
