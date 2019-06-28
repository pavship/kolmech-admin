import React from 'react'

import { Icon } from 'semantic-ui-react'
import { Button } from '../styled/styled-semantic'

import Menu from '../Menu'
import EnquiriesSubmenu from './EnquiriesSubmenu'

import GlobalContext from '../context/GlobalContext'

const EnquiriesMenu = ({
	refetchEnquiries,
	enquiriesAreLoading,
	refreshToken
}) => {
	return (
		<GlobalContext>
			{({ details, setDetails }) => (
				<Menu
					title='Заявки и заказы'
					refreshToken={refreshToken}
				>
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
				</Menu>
			)}
		</GlobalContext>
	)
}

export default EnquiriesMenu
