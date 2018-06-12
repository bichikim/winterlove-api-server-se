import Joi from 'joi'

export const name = Joi.string()
export const email = Joi.string().email()

export const user = Joi.object({
  name: name.required(),
  email: email.required(),
})

export default user
