import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'
import update from 'immutability-helper'

// Create regular NetworkInterface by using apollo-client's API:
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:5000/graphql' // Your GraphQL endpoint
});

// Create WebSocket client
const wsClient = new SubscriptionClient(`ws://localhost:5000/subscriptions`, {
    reconnect: true,
    connectionParams: {
        // Pass any arguments you want for initialization
    }
})

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

// Finally, create your ApolloClient instance with the modified network interface
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true,
})

// subscribe // Uncaught TypeError: apolloClient.subscribeToMore is not a function
apolloClient.subscribe({
  // document throws // Uncaught TypeError: Cannot read property 'kind' of undefined
  query: gql`
    subscription togglerSubscription {
      toggler
    }
  `,
  updateQuery: (prev, { subscriptionData }) => {
    // outputs nothing ...
    console.log(subscriptionData)

    return update(prev, {
      toggler: {$set: subscriptionData.data.toggler}
    })
  },
  onError: (err) => console.error(err)
})

export default apolloClient
