import Joi from 'joi'
interface IOptions {
  mongoose?: boolean
}

export const name = Joi.object({
  first: Joi.string().required(),
  mid: Joi.string().required(),
  last: Joi.string().required(),
})
export const email = Joi.string().email()

const schemas = Joi.object({
  name,
  email,
})

export default schemas
