import React from 'react'
import produce from 'immer'

import { Query } from 'react-apollo'
import { orgLocal } from '../../graphql/org'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Header, Button } from '../styled/styled-semantic'

import GlobalContext from '../special/GlobalContext'

const MenuDiv = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #7e7e81;
	/* border-top: 1px solid rgb(180, 181, 182); color of Chrome address section bottom border */
	border-top: 1px solid rgb(160, 161, 162);
`

const ClosePanelIcon =  styled(Icon)`
	&&& {
		margin-left: auto;
		margin-right: 8px;
	}
`

export default ({
	closePanel
}) => {
	return (
		<GlobalContext>
			{({ bottomPanel, setBottomPanel }) =>
				<MenuDiv>
					<Query
						query={orgLocal}
						variables={{id: bottomPanel.orgId}}
					>
						{({ data }) => {
							if (data && data.orgLocal) return (
								<Header inline
									size='medium'
									content={`Представители \u00A0 ${data.orgLocal.name}`}
								/>
							)
							return null
						}}
					</Query>
					<Button compact circular menu
						activeColor='green'
						icon='plus'
						// content=''
						active={ !bottomPanel.id }
						onClick={() => setBottomPanel(
							produce(bottomPanel, draft => { delete draft.id })
						)}
					/>
					<ClosePanelIcon 
						link
						name='cancel'
						size='large'
						onClick={closePanel}
					/>
				</MenuDiv>
			}
		</GlobalContext>
	)
}
