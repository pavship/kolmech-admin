import React, { Component, Fragment } from 'react'

import { graphql, compose } from 'react-apollo'
import { getLayout, getLayoutOptions, setLayout } from '../graphql/layout'

import styled from 'styled-components'
import { Sidebar, Ref } from 'semantic-ui-react';
import Details from './Details'
import DetailsExtra from './DetailsExtra'

const SSidebar = styled(Sidebar)`
	&&&& {
		display: flex;
		width: 120%;
		background-color: white;
		transition: all .5s ease;
		max-width: ${props => 
			props.type === 'Enquiry'
			? '1000px'
			: '1320px'
		};
		${props => !props.extra && `
			&.ui.visible.right.overlay.sidebar {
				transform: translate3d(40%,0,0);
			}
		`}
		${props => props.extra && `
			width: 86%;
		`}
	}
`

class DetailsSidebar extends Component {
	state = { detailsClosing: false }
	closeDetails = () => {
		this.setState({ detailsClosing: true })
		// set timeout for sidebar to finish animation
		setTimeout(() => {
			this.props.setLayout({variables: { input: { details: null, extra: null } }})
			this.setState({ detailsClosing: false })
		}, 300)
	}
	closeExtra = () => {
		this.props.setLayout({variables: { input: { extra: null } }})
	}
	render() {
		const { detailsClosing } = this.state
		const { layout: { details, extra } } = this.props
		return (
			<Ref innerRef={node => this.sidebarRef = node}>
				<SSidebar
					visible={!!details && !detailsClosing}
					extra={!!extra ? 1: 0}
					type={details && details.type}
					animation='overlay'
					direction='right'
				>
					{details &&
						<Fragment>
							<Details
								key={details.type + details.id}
								closeDetails={this.closeDetails}
								sidebarRef={this.sidebarRef}
							/>
							<DetailsExtra
								extra={extra}
								closeExtra={this.closeExtra}
							/>
						</Fragment>
					}
				</SSidebar>
			</Ref>
		)
	}
}

export default compose(
	graphql(getLayout, getLayoutOptions),
	graphql(setLayout, { name: 'setLayout' })
)(DetailsSidebar)