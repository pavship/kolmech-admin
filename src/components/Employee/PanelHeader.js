import React from 'react'
import produce from 'immer'

import { Query } from 'react-apollo'
import { orgLocal } from '../../graphql/org'

import styled from 'styled-components'
import { Header, Button, Icon } from '../styled/styled-semantic'

import GlobalContext from '../special/GlobalContext'

const MenuDiv = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid #7e7e81;
	/* border-top: 1px solid rgb(180, 181, 182); color of Chrome address section bottom border */
	border-top: 1px solid rgb(160, 161, 162);
`

export default ({
	closePanel
}) => {
	return (
		<GlobalContext>
			{({ bottomPanel, setBottomPanel }) =>
				<MenuDiv>
					<Icon
						w='30px'
						m='0 10px'
						link
						name='cancel'
						size='large'
						onClick={closePanel}
					/>
					<Query
						query={orgLocal}
						variables={{id: bottomPanel.orgId}}
					>
						{({ data }) => {
							if (data && data.orgLocal) return (
								<Header inline
									pl='0 !important'
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
					
				</MenuDiv>
			}
		</GlobalContext>
	)
}
