import React, { Component, Fragment } from 'react'

import { graphql, compose, ApolloConsumer, Query  } from 'react-apollo'
import { enquiryDetails, enquiryLocal } from '../graphql/enquiry'

import { Header as SHeader, Icon } from 'semantic-ui-react'
import { Span } from './styled-semantic/styled-semantic'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderExistingEntity from './DetailsHeaderExistingEntity'

import GlobalContext from './special/GlobalContext'

import { entityTitles } from '../constants'

class DetailsHeader extends Component {
	render() {
		const { type, entityQuery: { refetch }, entityLocal } = this.props
		return (
			<GlobalContext>
				{({ details: { type, id, editMode}, setDetails }) => (
					<DetailsHeaderContainer
						closeDetails={() => setDetails(null)}
					>
						{ id === 'new' &&
							<SHeader.Content>
								{entityTitles[type].new}
							</SHeader.Content>
						}
						{ id !== 'new' &&
							<DetailsHeaderExistingEntity
								type={type}
								id={id}
								editMode={editMode}
							/>
						}
					</DetailsHeaderContainer>
				)}
			</GlobalContext>
		)
	}
}

export default compose(
	graphql(enquiryDetails, getLayoutOptions),
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' }),
	graphql(enquiryDetails, { name: 'entityQuery', skip: (props) => props.details.id === 'new' })
)(DetailsHeader)


const DetailsHeader = () => {
	const typeName = 
	return (
		<GlobalContext>
			{({ details: { type, id, editMode, enquiryId }, setDetails }) => (
				// @ts-ignore
				<CardSection head noIndent>
					<Header m='0' >
						<Icon link
							name='cancel'
							onClick={() => setDetails(null)}
						/>
						{	type === 'Enquiry'
							? <SHeader.Content>
									{	id === 'new'
										? 'Новая заявка'
										:	<Query
												query={enquiryLocal}
												variables={{ id }}
											>
												{({ data }) => {
													if (!data || !data.enquiryLocal) return null
													const { num, dateLocal } = data.enquiryLocal
													return (
														<Fragment>
															Заявка №{num}
															<Span
																ml='10px'
																fs='1rem'
																c='rgba(0,0,0,.6)'
																ws='0.5em'
															>
																от {dateLocal}
															</Span>
															{/* { editMode
																? 
															} */}
															{/* <Query
																query={enquiryDetails}
																variables={ id }
																fetchPolicy='cache-only'
															>
																{({ refetch }) => (

																)}
															</Query> */}
														</Fragment>
													)
												}}
											</Query>
									}
								</SHeader.Content> :
							type === 'Order'
							? <SHeader.Content>
									Новый заказ
								</SHeader.Content>
							: null
						}
					</Header>
				</CardSection>
			)}
		</GlobalContext>
	)
}

export default DetailsHeader
// export default compose(
// 	graphql(enquiryDetails, { name: 'enquiryQuery', skip: (props) => props.details.id === 'new' })
// )(DetailsHeader)
