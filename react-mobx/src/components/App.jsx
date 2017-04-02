import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { observer, inject } from 'mobx-react'
import View from "react-flexbox"

@inject("toggler") @observer
export default class App extends Component {
  handleToggle(e) {
    this.props.toggler.toggle()
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
        <input type="checkbox" checked={this.props.toggler.state} onChange={this.handleToggle.bind(this)} />
      </View>
    )
  }
}
