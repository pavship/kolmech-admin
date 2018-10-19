import React from 'react'

import { Icon, Popup as SPopup } from 'semantic-ui-react'
import { Div, Header, Button, Popup } from './styled-semantic/styled-semantic'
import styled from 'styled-components'

import { Query } from 'react-apollo'
import { graphql, compose } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout } from '../graphql/layout'
import { enquiryLocal } from '../graphql/enquiry'

import GlobalContext from './special/GlobalContext'

const SubmenuDiv = styled.div`
	align-self: stretch;
	position: relative;
	margin-left: 10px;
	padding: 0 1em;
	display: flex;
	align-items: center;
	background-color: #f5f6f7;
	border-top-right-radius: .35rem;
	border-bottom-right-radius: .35rem;
	::before {
		position: absolute;
		z-index: 2;
		content: '';
		top: 50%;
		left: 0;
		background-color: #fff;
		width: 1.74em;
		height: 1.74em;
		transform: translateY(-50%) translateX(-50%) rotate(-45deg);
	}
	/* ::after {
		position: absolute;
		z-index: 2;
		content: '';
		top: 50%;
		right: 0;
		background-color: #f3f4f5;
		width: 1.74em;
		height: 1.74em;
		transform: translateY(-50%) translateX(50%) rotate(-45deg);
	} */
`

// const EnquiriesSubmenu = ({ item, addNewOrder, setLayout, layout: { details } }) => {
const EnquiriesSubmenu = () => {
	return (
		<GlobalContext>
			{({ details: { type, id, enquiryId }, setDetails }) => (
				<Query 
					query={enquiryLocal}
					variables={{ 
						id: type === 'Enquiry' 
							? id
							: enquiryId
					}}
				>
					{({ data }) => {
						if (data && data.enquiryLocal) {
							const { num, lastCoEvents } = data.enquiryLocal
							const addNewOrderForbidden = !lastCoEvents.length
							return (
								<SubmenuDiv>
									<Header inline
										c='rgba(0,0,0,.68)'
										size='medium'
										content={`Заявка №${num}`}
									/>
									<Popup 
										position='bottom left'
										size='small'
										flowing
										showIf={addNewOrderForbidden}
										trigger={
											<Div inline>
												<Button compact circular menu
													ml='0'
													activeColor='green'
													icon='plus'
													content='Заказ'
													active={
														type === 'Order'
														&& id === 'new'
													}
													disabled={addNewOrderForbidden}
													onClick={() => setDetails({
														type: 'Order',
														id: 'new',
														enquiryId: id
													})}
												/>
											</Div>
										} 
									>
										<SPopup.Header content='Не все условия выполнены' />
										<SPopup.Content>
											<Icon name='cancel' color='red' />
											Выставлено КП
										</SPopup.Content>
									</Popup>
								</SubmenuDiv>
							)
						} else return null
					}}
				</Query>
			)}
		</GlobalContext>
	)
}

export default compose(
	graphql(setLayout, { name: 'setLayout' }),
	graphql(getLayout, getLayoutOptions),
)(EnquiriesSubmenu)
