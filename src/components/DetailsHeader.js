import React, { Component } from 'react'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'

class DetailsHeader extends Component {
	render() {
		const {
			buttons,
			size,
			noIndent,
			bottomBorder,
			title,
			subtitle,
			titleSize,
			onClick,
			// expandable
			expanded,
		} = this.props
		return (
			<DetailsHeaderContainer
				expanded={expanded}
				onClick={onClick}
				size={size}
				noIndent={noIndent}
				bottomBorder={bottomBorder}
			>
				<DetailsHeaderTitle
					title={title}
					subtitle={subtitle}
					size={titleSize || size}
				/>
				{ buttons &&
					<DetailsHeaderButtons>
						{buttons}
					</DetailsHeaderButtons>
				}
			</DetailsHeaderContainer>
		)
	}
}

export default DetailsHeader
