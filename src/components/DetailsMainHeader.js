import React, { Fragment } from 'react'

import { Button } from './styled/styled-semantic'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'
import RefreshButton from './common/RefreshButton'

const settings = {
	Enquiry: {
		titleNew: 'Новая заявка',
		titleExisting: 'Заявка №',
	},
	Order: {
		titleNew: 'Новый заказ',
		titleExisting: 'Заказ №',
	},
	Model: {
		titleNew: 'Новое изделие',
		titleExisting: '',
	}
}

const DetailsMainHeader = ({
	type,
	closeDetails,
	loading,
	refresh,
	setDetails,
	editMode,
	localEntity
}) => {
	const { id, num, fullnum, name, article, dateLocal } = localEntity || {}
	return (
		<DetailsHeaderContainer
			close={closeDetails}
		>
			{ !id && // new entity
				<DetailsHeaderTitle
					title={settings[type].titleNew}
				/>
			}
			{ id && // existing entity
				<Fragment>
					<DetailsHeaderTitle
						title={type === 'Model'
							? name
							: settings[type].titleExisting + ' ' + (num || fullnum)
						}
						subtitle={type === 'Model'
							? (article ? `Артикул: ${article}` : '')
							: 'от ' + dateLocal
						}
					/>
					<DetailsHeaderButtons>
						<RefreshButton
							loading={loading}
							onClick={refresh}
						/>
						<Button
							icon='edit'
							activeColor='blue'
							active={editMode || false}
							onClick={() => setDetails({
								type,
								id: localEntity.id,
								editMode: true
							})}
						/> 
					</DetailsHeaderButtons>
				</Fragment>
			}
		</DetailsHeaderContainer>
	)
}

export default DetailsMainHeader
