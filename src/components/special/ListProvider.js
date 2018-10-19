import { Component } from 'react'

export default class ListProvider extends Component {
	state = {
		list: []
	}
	setList = (list) => this.setState({ list })
	toggle = (item) => {
		const { list } = this.state
		const newList = 
			list.includes(item)
			? [ ...list.filter(i => i !== item) ]
			: [ ...list, item ]
		this.setState({ list: newList })
	}
	render() {
		return this.props.children({
			list: this.state.list,
			setList: this.setList,
			toggle: this.toggle,
		})
	}
}
