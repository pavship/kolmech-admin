import React, { forwardRef } from 'react'

import DetailsHeaderContainer from './DetailsHeaderContainer'
import DetailsHeaderTitle from './DetailsHeaderTitle'
import DetailsHeaderButtons from './DetailsHeaderButtons'

export default forwardRef(({
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
}, ref) => {
	return (
		<DetailsHeaderContainer
			ref={ref}
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
})
