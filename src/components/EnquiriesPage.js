import React, { Component } from 'react'

import { graphql, compose } from 'react-apollo'
import { allEnquiries } from '../graphql/enquiry'
import { setLayout } from '../graphql/layout'

import styled from 'styled-components'
import { Sidebar } from 'semantic-ui-react'

import EnquiriesMenu from './EnquiriesMenu'
import EnquiriesTable from './EnquiriesTable'
import DetailsSidebar from './DetailsSidebar'
import PanelPusher from './common/PanelPusher';
import EnquiriesBottomPanel from './EnquiriesBottomPanel';
import GlobalContext from './special/GlobalContext';

const Pushable = styled(Sidebar.Pushable)`
	min-height: calc(100vh - 36px) !important;
`

export class EnquiriesPage extends Component {
	// TODO refactor -> move bottomPanel logic to PanelProvider, switch to Apollo Query components
	state = { panelClosing: false }
	closePanel = () => {
		this.setState({ panelClosing: true })
		// set timeout for panel to finish animation
		setTimeout(() => {
			this.props.setLayout({variables: { input: { bottomPanel: null } } })
			this.setState({ panelClosing: false })
		}, 430)
	}
	render() {
		const {
			allEnquiries: { loading, error, refetch, enquiries },
			refreshToken
		} = this.props
		const { panelClosing } = this.state
		return <>
			<EnquiriesMenu
				refetchEnquiries={() => refetch()}
				enquiriesAreLoading={loading}
				refreshToken={refreshToken}
			/>
			{loading && "Загрузка..."}
			{error && `Ошибка ${error.message}`}
			{enquiries &&
				<GlobalContext>
					{({ bottomPanel }) =>
						<Pushable>
							<DetailsSidebar />
							<Sidebar.Pusher>
								<PanelPusher
									panel={
										<EnquiriesBottomPanel
											closePanel={this.closePanel}
										/>
									}
									panelRendered={!!bottomPanel}
									panelVisible={!!bottomPanel && !panelClosing}
								>
									<EnquiriesTable
										enquiries={enquiries}
									/>
								</PanelPusher>
							</Sidebar.Pusher>
						</Pushable>
					}
				</GlobalContext>
			}
		</>
	}
}

export default compose(
	graphql(allEnquiries, {
		name: 'allEnquiries',
		alias: 'allEnquiriesQuery'
	}),
	graphql(setLayout, { name: 'setLayout' })
)(EnquiriesPage)