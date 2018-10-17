import React, { Fragment } from 'react'

import GlobalContext from './special/GlobalContext'

import Table from './common/Table'
import TableRow from './common/TableRow'

const fields = [{
	name: 'num',
	path: 'num',
	title: '№',
	width: '40px'
},{
	name: 'date',
	path: 'dateLocal',
	title: 'Дата',
	width: '110px'
},{
	name: 'org',
	path: 'org.name',
	title: 'Организация',
	width: '250px'
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
	path: 'lastCoEvents.0.doc.amount',
	title: 'Сумма',
	width: '105px'
},{
	name: 'status',
	path: 'curStatusEvents.0.status.name',
	title: 'Статус',
	width: '130px'
}]

const EnquiriesTable = ({ enquiries }) => {
	return (
		<GlobalContext>
			{({ details, setDetails, setExpanded }) =>
				<Table
					fields={fields}
				>
					{({ tableFields }) => 
						enquiries.map(enquiry => {
							const { id, isExpanded } = enquiry
							return (
								<Fragment key={id} >
									<TableRow
										entity={enquiry}
										tableFields={tableFields}
										expandFor='orders'
										expanded={isExpanded}
										// setExpanded={setExpanded}
										expand={() => {
											setExpanded({
												id,
												value: !isExpanded
											}
										)}}
										active={
											details
											&& details.type === 'Enquiry'
											&& id === details.id
										}
										onClick={() => {
											setDetails({
												type: 'Enquiry',
												id
											})
											setExpanded({
												id,
												value: !isExpanded
											})
										}}
									>
									</TableRow>
									{	isExpanded && enquiry.orders.map((order, i) => {
										const { id, num, prods } = order
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
													value: enquiry.num + '-' + num
												},{
													name: 'org',
													value: enquiry.org.name
												},{
													name: 'model',
													value: enquiry.model.name
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