import {Model} from 'mongoose'

export default (models: {[name: string]: Model<any>}) => {
  return {
    Query: {
      async getDocsById(root: any, {id}: {id: any}) {
        return await models.User.findById(id)
      },
      async getUserByEmail(root: any, {email}: {email: string}) {
        return await models.User.findOne({email})
      },
    },
    Mutation: {
      async createUser(root: any, args: any) {
        const user = new models.User(args)
        return await user.save()
      },
    },
  }
}
