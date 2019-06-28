import React, { Fragment } from 'react'

import GlobalContext from '../context/GlobalContext'

import Table from '../common/Table'
import TableRow from '../common/TableRow'
import { Div, Icon } from '../styled/styled-semantic'

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
	width: '225px',
  truncated: true
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
			{({ details,extra, setDetails, bottomPanel, setBottomPanel, setExpanded }) =>
				<Table
					fields={fields}
				>
					{({ tableFields }) => 
						enquiries.map(enquiry => {
							const { id, org, docs, isExpanded, model, orders } = enquiry
							const active = details
								&& details.type === 'Enquiry'
								&& id === details.id
							return (
								<Fragment key={id} >
									<TableRow
										lineHeight='21px'
										entity={enquiry}
										tableFields={tableFields}
										rowFields={[{
											name: 'amount',
											value: docs.length && docs[docs.length - 1].amount
										},{
											name: 'emps',
											icon: org.employees.length ? 'user' : 'user plus',
											iconColor: 'grey',
											hoverable: true,
											hideUnhovered: true,
											hasEntries: !!org.employees.length,
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
										},{
											name: 'model',
											content: <Div
													d='flex'
												>
													<Div
														minw='215px'
													>
														{model.name}
													</Div>
													{!!model.drawings.length &&
														<Icon
															mr='5px'
															o='.6'
															name='image outline'
															color='grey'
															size='large'
														/>
													}
												</Div>,
											hoverable: true,
											onClick: () => {
												setDetails({
													type: 'Model',
													id: model.id
												})
											},
											active: details
												&& details.type === 'Model'
												&& details.id === model.id
										},{
											name: 'reserved',
											value: orders.reduce((res, o) => res += o.prods.length, 0),
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
									{	isExpanded && orders.map((order, i) => {
										const { id, prods } = order
										return (
											// @ts-ignore
											<TableRow
												key={id}
												secondary={1}
												lastSecondaryRow={i === enquiry.orders.length - 1 ? 1 : 0}
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
			}
		</GlobalContext>
	)
}

export default EnquiriesTable