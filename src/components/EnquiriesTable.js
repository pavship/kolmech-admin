import React, { Fragment } from 'react'

import GlobalContext from './special/GlobalContext'

import Table from './common/Table'
import TableRow from './common/TableRow'

const fields = [{
	name: 'num',
	path: 'num',
	title: '№',
	width: '45px'
},{
	name: 'date',
	path: 'dateLocal',
	title: 'Дата',
	width: '110px'
},{
	name: 'org',
	path: 'org.name',
	title: 'Организация',
	width: '225px'
},{
	name: 'emps',
	path: 'org.name',
	width: '50px'
},{
	name: 'model',
	path: 'model.name',
	title: 'Изделие',
	width: '250px'
},{
	name: 'qty',
	path: 'qty',
	title: 'Кол.',
	width: '50px'
},{
	name: 'reserved',
	title: 'Рез.',
	width: '50px'
},{
	name: 'amount',
	title: 'Сумма',
	width: '105px'
},{
	name: 'status',
	path: 'status.name',
	title: 'Статус',
	width: '130px'
}]

const EnquiriesTable = ({ enquiries }) => {
	return (
		<GlobalContext>
			{({ details, setDetails, bottomPanel, setBottomPanel, setExpanded }) =>
				<Table
					fields={fields}
				>
					{({ tableFields }) => 
						enquiries.map(enquiry => {
							const { id, org, docs, isExpanded } = enquiry
							const active = details
								&& details.type === 'Enquiry'
								&& id === details.id
							return (
								<Fragment key={id} >
									<TableRow
										entity={enquiry}
										tableFields={tableFields}
										rowFields={[{
											name: 'amount',
											value: docs.length && docs[docs.length - 1].amount
										},{
											name: 'emps',
											icon: org.employees.length ? 'user' : 'user plus',
											iconColor: 'grey',
											type: 'onHover',
											styles: ['center'],
											value: org.employees.length || ' ',
											onClick: () => {
												setBottomPanel({
													type: 'Employees',
													orgId: org.id
												})
											},
											active: bottomPanel
												&& bottomPanel.type === 'Employees'
												&& bottomPanel.orgId === org.id
										}]}
										expandFor='orders'
										expanded={isExpanded}
										expand={() => {
											setExpanded({
												id,
												value: !isExpanded
											}
										)}}
										active={active}
										onClick={() => {
											setDetails({
												type: 'Enquiry',
												id
											})
											setExpanded({
												id,
												value: !active ? true : !isExpanded
											})
										}}
									>
									</TableRow>
									{	isExpanded && enquiry.orders.map((order, i) => {
										const { id, prods } = order
										return (
											// @ts-ignore
											<TableRow
												secondary={1}
												lastSecondaryRow={i === enquiry.orders.length - 1 ? 1 : 0}
												key={id}
												entity={order}
												tableFields={tableFields}
												rowFields={[{
													name: 'num',
													path: 'fullnum'
												},{
													name: 'org',
													value: enquiry.org.name
												},{
													name: 'model',
													value: enquiry.model && enquiry.model.name //check only for migration from aws
												},{
													name: 'reserved',
													value: prods.length
												},{
													name: 'amount',
													path: 'amount'
												}]}
												active={
													details
													&& details.type === 'Order'
													&& id === details.id
												}
												onClick={() => {
													setDetails({
														type: 'Order',
														id
													})
												}}
											>
											</TableRow>
										)
									})}
								</Fragment>
							)
						}
					)}
				</Table>
				// {/* {name} <ProdQtyLabel color='grey' basic content={`${prods.length}шт`} /> */}
			}
		</GlobalContext>
	)
}

export default EnquiriesTable