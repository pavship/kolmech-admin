import React, { Fragment } from 'react'

import cloneDeep from 'lodash/cloneDeep'

import Table from '../common/Table'
import TableRow from '../common/TableRow'

const defaultFields = [{
	name: 'name',
	path: 'name',
	title: 'Участок / № Изделия',
	width: '170px'
},{
	name: 'progress',
	path: 'progress',
	title: 'Заверш.',
	width: '65px'
},{
	name: 'hasDefect',
	path: 'hasDefect',
	title: 'Отклон.',
	width: '65px'
},{
	name: 'isSpoiled',
	path: 'isSpoiled',
	title: 'Брак',
	width: '55px'
},{
	name: 'reserve',
	title: 'Резерв',
	width: '75px'
}]

const DeptProdTable = ({
	// data
	depts,
	skipFields = [],
	// methods
	select,
	expand,
	// visual
	indent,
	nameFieldWidth
}) => {
	const fields = cloneDeep(defaultFields)
	if (nameFieldWidth) fields.find(f => f.name === 'name').width = nameFieldWidth
	return (
		<Table
			fields={fields.filter(f => !skipFields.includes(f.name))}
			indent={indent}
			select={select}
			expand={expand}
		>
			{({ tableFields }) => <Fragment>
				{depts.map(dept => {
						const { id, expanded } = dept
						if (id === 'unreserved') return (
							<TableRow
								key={id}
								// bold
								entity={dept}
								tableFields={tableFields}
								rowFields={[
									{
										name: 'name',
										value: dept.name + ' ('+ dept.count + ')'
									},
								]}
							/>
						)
						return (
							<Fragment
								key={id}
							>
								<TableRow
									entity={dept}
									tableFields={tableFields}
									expandFor='prods'
									expanded={expanded}
									expand={() => expand(id)}
									onClick={() => expand(id)}
									select={() => select(id)}
									rowFields={[
										{
											name: 'name',
											value: dept.name + ' ('+ dept.count + ')'
										},
										{
											name: 'progress',
											path: 'readyCount',
											icon: 'checkmark',
											iconColor: 'green'
										},
										{
											name: 'hasDefect',
											path: 'hasDefect',
											icon: 'warning sign',
											iconColor: 'orange'
										},
										{
											name: 'isSpoiled',
											path: 'isSpoiled',
											icon: 'broken chain',
											iconColor: 'red'
										},
										{
											name: 'reserve',
											path: 'orderedCount',
											icon: 'gavel',
											iconColor: 'brown'
										},
									]}
								/>
								{	expanded && dept.prods.map((prod, i) => {
									const { id, progress, order, added, removed } = prod
									return (
										// @ts-ignore
										<TableRow
											secondary={1}
											lastSecondaryRow={i === dept.prods.length - 1 ? 1 : 0}
											key={id}
											entity={prod}
											tableFields={tableFields}
											select={() => select(id)}
											rowFields={[
												...(added || removed) ? [{
													name: 'service',
													value: true,
													icon: added ? 'plus' : 'minus',
													iconColor: added ? 'green' : 'red'
												}] : [],
												{
													name: 'name',
													path: 'fullnumber'
												},
												{
													name: 'progress',
													value: progress && progress + '%'
												},
												{
													name: 'hasDefect',
													path: 'hasDefect',
													icon: 'warning sign',
													iconColor: 'orange'
												},
												{
													name: 'isSpoiled',
													path: 'isSpoiled',
													icon: 'broken chain',
													iconColor: 'red'
												},
												{
													name: 'reserve',
													value: order && order.fullnum,
												}
											]}
											// active={}
											onClick={select && (() => select(id))}
										/>
									)
								})}
							</Fragment>
						)
					})}
			</Fragment>}
		</Table>
		// {/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
	)
}

export default DeptProdTable