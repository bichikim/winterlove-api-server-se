import {IContext} from '@/types'

export default ({models}: IContext) => {
  return {
    Query: {
      async doc(root: any, {id}: {id: any}) {
        return await models.Docs.findById(id)
      },
      async docs(root: any, {offset, take}: {offset: number, take: number}) {
        return await models.Docs.find().skip(offset).limit(take)
      },
    },
    Mutation: {
      async create(root: any, args: any) {
        const {title, description, ok = false} = args
        const user = new models.Docs({
          title, description, ok, time: Date.now(),
        })
        return await user.save()
      },
    },
  }
}
