import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'

class Docs {
  message: string = 'hello'
  get() {
    return this.message
  }
}

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      Docs: {
        type: GraphQLString,
        resolve: () => (new Docs()),
      },
    },
  }),
})
