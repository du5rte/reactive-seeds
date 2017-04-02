import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import { togglerQueries, togglerMutations, togglerSubscriptions } from "./toggler"

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: () => ({
      /* insert queries */
      ...togglerQueries
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: () => ({
      /* insert mutations */
      ...togglerMutations
    })
  }),
  subscription: new GraphQLObjectType({
    name: 'Subscriptions',
    fields: () => ({
      /* insert subscriptions */
      ...togglerSubscriptions
    })
  })
})
