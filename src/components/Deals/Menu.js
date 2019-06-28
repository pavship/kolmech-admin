import React from 'react'
import { Mutation } from 'react-apollo'
import { syncDeals } from '../../graphql/deal'
import { Button } from '../styled/styled-semantic'
import { Icon } from 'semantic-ui-react'
import Menu from '../Menu'

export default ({
	notify,
  title,
  titleLinkTo,
	refreshToken,
	refetchDeals
}) => {
  return <Mutation
		mutation={syncDeals}
		onCompleted={async ({ syncDeals: { count } }) => {
			// await refetchDeals()
			notify({
				type: 'success',
				title: 'Сделки синхронизированы с AmoCRM'
			})
		}}
		onError={err => notify({
			type: 'error',
			title: 'Ошибка синхронизации с AmoCRM',
			content: err.message,
		})}
  >
    {(syncDeals, { loading }) =>
      <Menu
        title={title}
        titleLinkTo={titleLinkTo}
        refreshToken={refreshToken}
      >
        <Button compact circular menu
					w='170px'
					ml='0'
					ta='left'
					activeColor='blue' 
					onClick={syncDeals}
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
  </Mutation>
}

