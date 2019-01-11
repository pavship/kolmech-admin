import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Header, Button } from './styled/styled-semantic'

import EnquiriesSubmenu from './EnquiriesSubmenu'

import { Query } from 'react-apollo'
import { meLocal } from '../graphql/user'

import GlobalContext from './special/GlobalContext'

const MenuDiv = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #7e7e81;
`

const EnquiriesMenu = ({
	refetchEnquiries,
	enquiriesAreLoading,
	refreshToken
}) => {
	return (
		<GlobalContext>
			{({ details, setDetails }) => (
				<MenuDiv>
					<Header inline
						size='medium'
						content='Заявки и заказы'
					/>
					<Button compact circular menu
						w='118.5px'
						ml='0'
						ta='left'
						activeColor='blue' 
						onClick={refetchEnquiries}
					>
						<Icon 
							name='refresh'
							color={enquiriesAreLoading ? 'blue' : undefined} 
							loading={enquiriesAreLoading}
						/>
						{enquiriesAreLoading ? 'Загрузка' : 'Обновить'}
					</Button>
					<Button compact circular menu
						activeColor='green'
						icon='plus'
						content='Заявка'
						active={
							details
							&& details.type === 'Enquiry'
							&& details.id === 'new'
						}
						onClick={() => setDetails({type: 'Enquiry', id: 'new'})}
					/>
					{details && (
						(details.type === 'Enquiry' && details.id !== 'new')
						|| (details.type === 'Order' && details.id === 'new')
					) &&
						<EnquiriesSubmenu />
					}
					<Query query={meLocal}>
						{ ({ data }) => {
							if (data && data.me) {
								const { fName, lName } = data.me.person
								const menuNameTitle = fName + ' ' + (lName ? `${lName.slice(0,1)}.` : '')
								return (
									<Header inline
										ml='auto'
										size='small'
										content={menuNameTitle} 
									/>
							)} else return null
						}}
					</Query>
					<Icon link
						name='log out'
						size='large'
						onClick={() => refreshToken(null)} 
					/>
				</MenuDiv>
			)}
		</GlobalContext>
	)
}

export default EnquiriesMenu
