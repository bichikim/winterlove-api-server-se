import Joi from 'joi'

export const title = Joi.string()
export const description = Joi.string()
export const ok = Joi.boolean()

export const doc = Joi.object().keys({
  title: title.required(),
  description: description.required(),
  ok,
})

export default doc
