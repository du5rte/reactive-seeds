import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import View from "react-flexbox"

import { toggler as togglerActions } from '../actions'

const mapStateToProps = (state) => ({
  toggler: state.toggler
})
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(togglerActions, dispatch)
})

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class App extends Component {
  handleToggle(e) {
    this.props.toggle()
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
        <input type="checkbox" checked={this.props.toggler} onChange={this.handleToggle.bind(this)} />
      </View>
    )
  }
}
