import React from 'react'
import { syncDeals as sD } from '../../graphql/deal'
import { Button, Icon } from '../styled/styled-semantic'
import Menu from '../Menu'
import { useMutation } from '../hooks/apolloHooks';

export default function DealsMenu ({
  title,
  titleLinkTo,
	refetchDeals,
	budgetMode,
	setBudgetMode
}) {
	const [syncDeals, { loading }] = useMutation(sD, {
		successMsg: 'Сделки синхронизированы с AmoCRM',
		errMsg: 'Ошибка синхронизации сделок с AmoCRM'
	})
  return <Menu
		title={title}
		titleLinkTo={titleLinkTo}
	>
		<Icon
			link
			name='ruble sign'
			size='large'
			mr='9px'
			activeColor='green'
			active={budgetMode}
			onClick={() => setBudgetMode(!budgetMode)}
		/>
		<Button compact circular menu
			w='170px'
			ml='0'
			ta='left'
			activeColor='blue' 
			onClick={async () => {
				await syncDeals()
				refetchDeals()
			}}
		>
			<Icon
				name='refresh'
				color={loading ? 'blue' : undefined} 
				loading={loading}
			/>
			{loading ? 'Загрузка..' : 'Сделки AmoCRM'}
		</Button>
	</Menu>
}

