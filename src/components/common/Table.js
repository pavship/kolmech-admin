import React, { Fragment } from 'react'

import styled from 'styled-components'

const STable = styled.table`
	table-layout: fixed;
	width: 100%;
	border-collapse: collapse;
`

const TableHeader = styled.tr`
	color: rgba(0,0,0,.8);
	line-height: 1.5em;
	/* background: #f3f4f5; */
	background: rgb(233, 234, 235);
	border-top: 1px solid #d4d4d5;
	border-bottom: 1px solid #d4d4d5;
	font-weight: bold;
`

const Td = styled.td`
	padding-right: 4px;
	// @ts-ignore
	${props => props.w && `width: ${props.w};`}
`

const Table = ({
	children,
	fields,
	indent,
	select,
	expand
}) => {
	const modes =  {
		indent: !!indent,
		select: !!select,
		expand: !!expand,
	}
	const fieldsExtended = [
		...modes['indent'] && [{
			name: 'indent',
			width: indent
		}],
		{
			name: 'service',
			width: '23px'
		},
		...modes['select'] && [{
			name: 'select',
			width: '25px'
		}],
		...fields,
		// lastField is needed to take remaining width in fixed table-layout
		{ name: 'lastField' }
	]
	return (
		<STable>
			<tbody>
				<Fragment>
					<TableHeader>
						{fieldsExtended.map(f =>{
							// console.log(f)
							return <Td
								key={f.name}
								// @ts-ignore
								w={f.width}
							>
								{f.title}
							</Td>
						})}
					</TableHeader>
					{children({
						tableFields: fieldsExtended.map(f => ({ name: f.name, path: f.path })),
					})}
				</Fragment>
			</tbody>
		</STable>
	)
}

export default Table