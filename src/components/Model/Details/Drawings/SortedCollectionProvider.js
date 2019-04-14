import { Component } from 'react'
import produce from 'immer'
// import memoize from 'memoize-one'

export default class SortedCollectionProvider extends Component {
  // sort = () => {
  //   const { collection, sortBy } = this.props
  //   return collection.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
  // }
  // sort = memoize(watchedVar => {
  //   const { collection, sortBy } = this.props
  //   return this.setState({
  //     sortedCollection: collection.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : 1)
  //   })
  // })
  state = {
    sortedCollection: []
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
  move = ( oldIndex, newIndex ) => {
    this.setState(produce(draft => {
      const [ removed ] = draft.sortedCollection.splice(oldIndex, 1)
      draft.sortedCollection.splice(newIndex, 0, removed)
    }))
  }
  render() {
    const { children } = this.props
    const { sortedCollection } = this.state
    return children({
      sortedCollection,
      move: this.move
    })
  }
}
