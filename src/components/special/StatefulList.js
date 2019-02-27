import React, { Component } from 'react'
import { produce } from 'immer'

export default class StatefulList extends Component {
  state = {
    list: []
  }
  toggle = item => {
    this.setState(produce(draft => {
      console.log('draft > ', draft)
      const index = draft.list.indexOf(item)
      if (index !== -1) draft.list.splice(index, 1)
        else draft.list.push(item)
    }))
  }
  clear = () => this.setState({ list: [] })
  removeMany = items => {
    this.setState(({ list }) => ({
      list: [ ...list.filter(i => !items.includes(i)) ]
    }))
  }
  render() {
    return this.props.children({
      list: this.state.list,
      toggle: this.toggle,
      clear: this.clear,
      removeMany: this.removeMany,
    })
  }
}