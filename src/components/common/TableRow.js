import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Caret } from '../styled/styled-semantic'

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

const tdActiveStyle = `
	background: rgba(0,0,0,.12);
	.icon {
		opacity: 1 !important;
	}
`

const Td = styled.td`
	padding-right: 4px;
	white-space: nowrap;
	overflow: hidden;
  text-overflow: ellipsis;
	${props => props.service && `padding-left: 3px;`}
	${Row}:not(:hover) & {
		${props => props.type === 'onHover' && !props.active && `
			opacity: 0 !important;
		`}
	}
	${props => props.type === 'onHover' && `
		padding-left: 5px;
		transition: background .3s ease;
		:hover {
			${tdActiveStyle}
		}
		${props.active ? tdActiveStyle : ''}
	`}
	${props => props.styles && props.styles.includes('center') && `
		text-align: center;
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
				const {
					content,
					name,
					value,
					path,
					onClick,
					icon,
					iconColor,
					...rest
				} = f
				if (content) return (
					<Td
						key={name}
					>
						{content}
					</Td>
				)
				let val = value || (path ? getObjProp(entity, path) : null)
				if (val && name === 'amount') val = currency(val)
				return (
					<Td
						key={name}
						{...rest}
						onClick={
							!!onClick
							? e => {
									e.stopPropagation()
									onClick()
								}
							: undefined
						}
					>
						{val && icon &&
							<Icon
								link={!!onClick}
								name={icon}
								color={iconColor || undefined}
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