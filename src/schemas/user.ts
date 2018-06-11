import {object, string} from 'joi'

export const name = string()
export const email = string().email()

export const user = object({
  name: name.required(),
  email: email.required(),
})

export default user
