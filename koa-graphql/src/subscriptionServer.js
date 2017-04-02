import { SubscriptionServer } from 'subscriptions-transport-ws'
import { subscriptionManager } from './subscriptionManager'

export default ({ server, path }) => new SubscriptionServer({
  subscriptionManager,
  onConnect: async (connectionParams, webSocket) => {
    console.log("connected")
  },
}, {
  server,
  path
})
