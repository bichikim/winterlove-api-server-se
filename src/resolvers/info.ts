import {IContext} from '@/types'

export default ({models}: IContext) => {
  return {
    Query: {
      async info() {
        return await models.Info.findOne()
      },
    },
  }
}
