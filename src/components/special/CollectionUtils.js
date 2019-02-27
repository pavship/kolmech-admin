import React, { Component } from 'react'
import { produce } from 'immer'

export default class CollectionUtils extends Component {
  state = {
    collection: [],
    sortedBy: '',
    direction: null
  }
  static getDerivedStateFromProps(props, state) {
    if( props.collection !== state.prevPropsCollection) {
      console.log(' > getDerivedStateFromProps')
      const { collection, sortBy } = props
      return {
        prevPropsCollection: collection,
        sortedCollection: collection.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
      }
    }
    return null
  }
  sortBy = field => {
    this.setState(produce(draft => {
      const [ removed ] = draft.sortedCollection.splice(oldIndex, 1)
      draft.sortedCollection.splice(newIndex, 0, removed)
    }))
  }
  render() {
    console.log('> SortedCollectionProvider render')
    const { children, collection } = this.props
    console.log('collection > ', collection)
    // this.sort(collection)
    const { sortedCollection } = this.state
    console.log('sortedCollection > ', sortedCollection)
    return children({
      sortedCollection,
      move: this.move
    })
  }
}