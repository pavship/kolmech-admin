import React from 'react'

import styled from 'styled-components'

import GlobalContext from './special/GlobalContext'
import DetailsDataProvider from './DetailsDataProvider'
import DetailsMainHeader from './DetailsMainHeader'
import EnquiryDetails from './EnquiryDetails'
import OrderEdit from './OrderEdit'
import OrderDetails from './OrderDetails'
import ModelDetails from './Model/Details'

const Container = styled.div`
	/* flex-grow: 1; */
	width: 60%;  // evaluates to 792px
`

const Details = ({ closeDetails, sidebarRef }) => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId, editMode }, setDetails, setExpanded }) => (
				<Container>
					{/* Should I get rid of Details' components unification? */}
						<DetailsDataProvider
							type={type}
							id={id}
						>
							{({ loading, error, refetch, entity, localEntity }) =>
								<>
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
									{type === 'Model' &&
										(id === 'new' || editMode
											? <div></div>
											: (entity &&
													<ModelDetails
														model={entity}
														sidebarRef={sidebarRef}
													/>
												)
										)
									}
								</>
							}
						</DetailsDataProvider>
				</Container>
			)}
		</GlobalContext>
	)
}

export default Details
