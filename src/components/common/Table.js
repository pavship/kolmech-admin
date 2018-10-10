import React, { Component, Fragment } from 'react'

import styled from 'styled-components'

const STable = styled.table`
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
`

const TableHeader = styled.tr`
	color: rgba(0,0,0,.8);
	background: #f3f4f5;
	border-top: 1px solid #d4d4d5;
	border-bottom: 1px solid #d4d4d5;
`

const Td = styled.td`
	padding-right: 4px;
	// @ts-ignore
	${props => props.w && `width: ${props.w};`}
`

export class Table extends Component {
	isSelectable = typeof this.props.select !== 'undefined'
	state={
		expandedIds: []
	}
	toggleExpanded = (id) => {
		const newIds = [...this.state.expandedIds]
		if (newIds.includes(id))
			newIds.splice(newIds.indexOf(id), 1)
		else newIds.push(id)
		this.setState({ expandedIds: newIds })
	}
	render() {
		console.log('isSelectable > ', this.isSelectable)
		const { expandedIds } = this.state
		const { fields, children } = this.props
		const fieldsExtended = [
			{ 
				name: 'serviceField',
				width: '25px'
			},
			...this.isSelectable && [{
				name: 'select',
				width: '25px'
			}],
			...fields,
			// lastField is needed to take remaining width in fixed table-layout
			{ name: 'lastField' }
		]
		console.log('fieldsExtended > ', fieldsExtended)
		return (
			<STable><tbody>
			<Fragment>
				<TableHeader>
					{fieldsExtended.map(f => {
						return (
						<Td
							key={f.name}
							// @ts-ignore
							w={f.width}
						>
							{f.title}
						</Td>
					)})}
				</TableHeader>
				{children({
					tableFields: fieldsExtended.map(f => ({ name: f.name, path: f.path })),
					expandedIds,
					toggleExpanded: this.toggleExpanded
				})}
			</Fragment>
			</tbody></STable>
		)
	}
}

export default Table