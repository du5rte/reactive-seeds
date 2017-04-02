import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql'

import { pubsub } from "../../subscriptionManager"

let sourceOfTruth = false

export const TogglerType = new GraphQLNonNull(GraphQLBoolean)

export const togglerQuery = {
  type: TogglerType,
  description: "0 or 1, false or true",
  resolve(root, args, ctx, info) {
    return sourceOfTruth
  }
}

export const togglerMutation = {
  type: TogglerType,
  description: "Perceptions of truth are relative, choose yours",
  args: {
    value: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "0 or 1, false or true"
    }
  },
  resolve(root, args, ctx, info) {

    return Promise.resolve()
      .then(() => {
        sourceOfTruth = args.value

        return sourceOfTruth
      })
      .then((value) => {
        // publish subscription notification
        pubsub.publish("togglerChannel", value)

        return value
      })
  }
}

export const togglerSubscription = {
  type: TogglerType,
  description: "Are you ready for the truth?",
  resolve(root, args, ctx, info) {

    return sourceOfTruth
  }
}

export const togglerSetupFunction = (options, args) => ({
  subscribedToggle: {
    filter: toggle => toggle !== toggle
  }
})

export const togglerQueries = {
  toggler: togglerQuery
}

export const togglerMutations = {
  toggler: togglerMutation
}

export const togglerSubscriptions = {
  toggler: togglerSubscription
}

export const togglerSetupFunctions = {
  toggler: togglerSetupFunction
}
