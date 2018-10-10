import React, { Fragment } from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Caret } from '../styled-semantic/styled-semantic'

import { getObjProp } from '../../utils/object'
import { currency } from '../../utils/format'

const Row = styled.tr`
	font-size: 1rem;
	cursor: pointer;
	border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	// @ts-ignore
	${props => props.secondary && `{
		background-color: rgba(0,0,50,.02);
		// >td {
		// 	padding-left: 3px;
		// }
		// @ts-ignore
		${!props.lastSecondaryRow && 'border-bottom: none;'}
	}`}
	// @ts-ignore
	${props => props.active && `{
		background: rgba(0,0,0,.05);
		font-weight: bold;
		border-top: 1px solid rgba(34, 36, 38, 0.15);
		border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	}`}
	&:hover {
		background: rgba(0,0,0,.05);
    color: rgba(0,0,0,.95);
	}
`

const Td = styled.td`
	padding-right: 4px;
	${props => props.service && `
		padding-left: 3px;
	`}
`

const TableRow = ({ tableFields, rowFields = [], entity, expandFor, expanded, setExpanded, select, ...rest }) => {
	// rowFields have precedence over tableFields
	const fields = tableFields.map(f => rowFields.find(rf => rf.name === f.name) || f)
	const { selected } = entity
	return (
		<Row
			{...rest}
		>
			{fields.map(f => {
				// console.log(f)
				if (f.content) return (
					<Td
						key={f.name}
					>
						{f.content}
					</Td>
				)
				if (
					f.name === 'serviceField'
					&& typeof expanded !== 'undefined'
					&& entity[expandFor].length
				) return (
					<Td
						service
						key={f.name}
						onClick={(e) => {
							e.stopPropagation()
							setExpanded()
						}}
					>
						<Caret
							active={expanded ? 1 : 0}
						/>
					</Td>
				)
				if (
					f.name === 'select'
				) return (
					<Td
						service
						key={f.name}
						onClick={(e) => {
							e.stopPropagation()
							select()
						}}
					>
						<Icon
							name={'check square outline'}
							// color={f.iconColor || false}
						/>
					</Td>
				)
				let val = f.value || (f.path ? getObjProp(entity, f.path) : null)
				if (val && f.name === 'amount') val = currency(val)
				return (
					<Td
						key={f.name}
					>
						{val && f.icon &&
							<Icon
								name={f.icon}
								color={f.iconColor || false}
							/>
						}
						{val}
					</Td>
				)
			})}
		</Row>
	)
}

export default TableRow