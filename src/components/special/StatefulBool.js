import React, { Component } from 'react'
import { produce } from 'immer'

export default class StatefulBool extends Component {
  state = {
    bool: false
  }
  toggle = () => {
    this.setState(({ bool }) => ({ bool: !bool }))
  }
  enable = () => this.setState({ bool: true })
  disable = () => this.setState({ bool: false })
  render() {
    return this.props.children({
      bool: this.state.bool,
      toggle: this.toggle,
      enable: this.enable,
      disable: this.disable,
    })
  }
}