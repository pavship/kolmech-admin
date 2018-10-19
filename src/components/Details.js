import React from 'react'

import styled from 'styled-components'

import GlobalContext from './special/GlobalContext'
import DetailsMainHeader from './DetailsMainHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'
import OrderDetails from './OrderDetails'
import DetailsDataProvider from './DetailsDataProvider';

const Container = styled.div`
	/* flex-grow: 1; */
	width: 60%;
`

const Details = ({ closeDetails }) => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId, editMode}, setDetails, setExpanded }) => (
				<DetailsDataProvider
					type={type}
					id={id}
				>
					{({ loading, error, refetch, entity, localEntity }) =>
						<Container>
							<DetailsMainHeader
								type={type}
								localEntity={localEntity}
								closeDetails={closeDetails}
								setDetails={setDetails}
								editMode={editMode}
								loading={loading}
								refresh={() => refetch()}
							/>
							{type === 'Enquiry'
								? <EnquiryDetails
										id={id}
										closeDetails={closeDetails}
									/>
								:	null
							}
							{type === 'Order' &&
								(id === 'new' || editMode
									? <OrderEdit
											id={id}
											enquiryId={enquiryId}
											closeDetails={closeDetails}
											setDetails={setDetails}
											setExpanded={setExpanded}
										/>
									: (entity && 
											<OrderDetails
												order={entity}
											/>
										)
								)
							}
						</Container>
					}
				</DetailsDataProvider>
			)}
		</GlobalContext>
	)
}

export default Details
