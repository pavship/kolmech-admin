import React, { Fragment } from 'react'

import { graphql, compose } from 'react-apollo'
import { allEnquiries } from '../graphql/enquiry'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
import DetailsSidebar from './DetailsSidebar'

const Pushable = styled(Sidebar.Pushable)`
	min-height: calc(100vh - 36px) !important;
`

const EnquiriesPage = ({ 
	allEnquiries: { loading, error, refetch, networkStatus, enquiries },
	refreshToken
}) => {
	return (
		<Fragment>
			<EnquiriesMenu
				refetchEnquiries={() => refetch()}
				enquiriesAreLoading={loading}
				refreshToken={refreshToken}
			/>
			{loading && "Загрузка..."}
			{error   && `Ошибка ${error.message}`}
			{enquiries &&
				<Pushable>
					<DetailsSidebar />
					<Sidebar.Pusher>
						<EnquiriesTable 
							enquiries={enquiries}
						/>
					</Sidebar.Pusher>
				</Pushable>
			}
		</Fragment>
	)
}

export default compose(
	graphql(allEnquiries, {
			name: 'allEnquiries'
	})
)(EnquiriesPage)