import {IContext} from '@/types'

export default ({models}: IContext) => {
  return {
    Query: {
      async doc(root: any, {id}: {id: any}) {
        return await models.User.findById(id)
      },
      async docs(root: any, {offset, take}: {offset: number, take: number}) {
        return await models.User.find().skip(offset).limit(take)
      },
    },
    // Mutation: {
    //   async createDoc(root: any, args: any) {
    //     const user = new models.User(args)
    //     return await user.save()
    //   },
    // },
  }
}
