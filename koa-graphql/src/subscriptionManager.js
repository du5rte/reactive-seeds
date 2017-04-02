import { SubscriptionManager, PubSub } from 'graphql-subscriptions'

import schema from "./schema"

const pubsub = new PubSub()

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    toggler: (options, args) => ({
      togglerChannel: {
        filter: result => true
      }
    })
  },
})

// pubsub.subscribe("togglerChannel", (message) => {
//   console.log("pubsub", message)
// })

export { subscriptionManager, pubsub }
