import React, { Component, PropTypes } from 'react'
import View from "react-flexbox"

export default class App extends Component {
  render() {
    const style = {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '10vw'
    }

    return (
      <View style={style}>
        Hello World
      </View>
    )
  }
}
