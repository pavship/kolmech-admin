import { Component } from 'react'

import cloneDeep from 'lodash/cloneDeep'
import without from 'lodash/without'
import take from 'lodash/take'
import union from 'lodash/union'
import difference from 'lodash/difference'
import find from 'lodash/fp/find'

class ProdTableUtils extends Component {
	select = (id) => {
		const {
			depts: propDepts,
			setList,
			selectLimit
		} = this.props
		const depts = cloneDeep(propDepts)
		const selectedProdIds =
			depts.reduce((list, d) =>
				[
					...list,
					...d.prods.filter(p => p.selected).map(p => p.id)
				]
			, [])
		const dept =
			find({ id }, depts)
			|| find({ prods: [ { id } ]}, depts)
		const { prods } = dept
		const entity =
			dept.id === id
				? dept
				: find({ id }, prods)
		if (entity.disabled) return null
		let newList = []
		if (entity.__typename === 'Prod') {
			newList =
				selectedProdIds.includes(id)
					? without(selectedProdIds, id)
					: [...selectedProdIds, id]
		}
		if (entity.__typename === 'Dept') {
			if ([ 'partly', true ].includes(entity.selected))
				newList = difference(selectedProdIds, prods.map(p => p.id))
			if (entity.selected === false) {
				const idsWithinLimit = take(
					prods.filter(p => !p.disabled).map(p => p.id),
					selectLimit - selectedProdIds.length
				)
				newList = union(selectedProdIds, idsWithinLimit)
			}
		}
		setList(newList)
	}
	render () {
		const { children } = this.props
		return children({
			select: this.select
		})
	}
}

export default ProdTableUtils