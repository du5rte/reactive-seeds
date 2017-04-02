import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

import View from "react-flexbox"

@graphql(gql`
  query togglerQuery {
    toggler
  }
`)
@graphql(gql`
  mutation togglerMutation($value: Boolean!) {
    toggler(value: $value)
  }
`,{
  props: ({ ownProps, mutate }) => ({
    toggle: (value) => mutate({
      variables: {
        value
      },
      updateQueries: {
        togglerQuery: (prev, { mutationResult }) => update(prev, {
          toggler: {$set: mutationResult.data.toggler}
        })
      }
    })
  })
})
export default class App extends Component {
  componentDidMount() {
    this.togglerSubscription = this.props.data.subscribeToMore({
      document: gql`
        subscription togglerSubscription {
          toggler
        }
      `,
      updateQuery: (prev, { subscriptionData }) => update(prev, {
        toggler: {$set: subscriptionData.data.toggler}
      })
    })
  }

  componentWillReceiveProps(newProps) {
    // if (!newProps.data.loading) {
    //   if (this.subscription) {
    //     if (newProps.data.feed !== this.props.data.feed) {
    //       // if the feed has changed, we need to unsubscribe before resubscribing
    //       this.subscription.unsubscribe()
    //     } else {
    //       // we already have an active subscription with the right params
    //       return
    //     }
    //   }
    //
    //   // const entryIds = newProps.data.feed.map(item => item.id)
    //
    //   this.subscription = newProps.data.subscribeToMore({
    //     document: gql`
    //       subscription togglerSubscription {
    //         toggler
    //       }
    //     `,
    //     variables: {},
    //
    //     // this is where the magic happens.
    //     updateQuery: (prev, {subscriptionData}) => {
    //       console.log('😱')
    //
    //       return prev // Modify your store and return new state with the new arrived data
    //     },
    //     onError: (err) => console.error(err),
    //   })
    // }
  }

  handleToggle(e) {
    this.props.toggle(!this.props.data.toggler)
  }

  render() {
    const style = {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '10vw'
    }

    return (
      <View style={style}>
        <input type="checkbox" checked={this.props.data.toggler} onChange={this.handleToggle.bind(this)} />
      </View>
    )
  }
}
