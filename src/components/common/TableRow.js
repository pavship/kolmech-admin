import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Caret } from '../styled-semantic/styled-semantic'

import { getObjProp } from '../../utils/object'
import { currency } from '../../utils/format'

const Row = styled.tr`
	font-size: 1rem;
	cursor: pointer;
	border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	:hover {
		background: rgba(0,0,0,.05);
		color: rgba(0,0,0,.95);
	}
	${props => props.secondary && `
		background: rgba(0,0,50,.02);
		${!props.lastSecondaryRow ? 'border-bottom: none;' : ''}
	`}
	${props => props.active && `
		background: rgba(0,0,0,.05);
		font-weight: bold;
		border-top: 1px solid rgba(34, 36, 38, 0.15);
		border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	`}
	${props => props.bold && `
		font-weight: bold;
	`}
`

const Td = styled.td`
	padding-right: 4px;
	${props => props.service && `
		padding-left: 3px;
	`}
`

const TableRow = ({
	tableFields,
	rowFields = [],
	entity,
	expandFor,
	expanded,
	expand,
	select,
	...rest 
}) => {
	// rowFields have precedence over tableFields
	const fields = tableFields.map(f => rowFields.find(rf => rf.name === f.name) || f)
	const { selected, disabled } = entity
	return (
		<Row
			{...rest}
		>
			{fields.map(f => {
				// console.log(f)
				if (
					f.name === 'service'
					&& typeof expanded !== 'undefined'
					&& entity[expandFor].length
				) return (
					<Td
						service
						key={f.name}
						onClick={(e) => {
							e.stopPropagation()
							expand()
						}}
					>
						<Caret
							active={expanded ? 1 : 0}
						/>
					</Td>
				)
				if (
					f.name === 'select'
					&& typeof select !== 'undefined'
				) return (
					<Td
						key={f.name}
						service
						onClick={(e) => {
							e.stopPropagation()
							select()
						}}
					>
						<Icon
							disabled={disabled}
							name={
								selected === 'partly' ? 'square' :
								selected 
									? 'check square outline'
									: 'square outline'
							}
						/>
					</Td>
				)
				if (f.content) return (
					<Td
						key={f.name}
					>
						{f.content}
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