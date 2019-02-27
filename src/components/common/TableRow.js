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
	${props => props.lineHeight && `
		line-height: ${props.lineHeight};
	`}
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
	opacity: 1 !important;
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
		${props => props.hoverable
			&& props.hideUnhovered
			&& !props.active
			&& !props.hasEntries && `
			opacity: 0 !important;
		`}
	}
	${props => props.color && `color: ${props.color};`}
	${props => props.hoverable && `
		transition: background .3s ease;
		${props.hideUnhovered && `
			opacity: 0.8;
			padding-left: ${props.hasEntries ? '5px' : '7.5px'};
		`};
		:hover {
			${tdActiveStyle}
		}
		${props.active ? tdActiveStyle : ''}
	`}
`

const TableRow = props => {
	const {
		tableFields,
		rowFields = [],
		entity,
		expandFor,
		expanded,
		expand,
		select,
		...rest 
	} = props
	// rowFields are merged into tableFields
	const fields = tableFields.map(f => {
		const rowField = rowFields.find(rf => rf.name === f.name)
		return rowField ? { ...f, ...rowField } : f
	})
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
					component,
					content,
					name,
					value,
					path,
					onClick,
					icon,
					iconColor,
					...rest
				} = f
				if (component || content) return (
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
						{component ? props[component] : null}
						{content ? content : null}
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