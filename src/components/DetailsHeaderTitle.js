import React from 'react'

import { Header } from './styled/styled-semantic'
import DetailsHeaderSubitle from './DetailsHeaderSubitle'

const DetailsHeaderTitle = ({
	title,
	subtitle,
	size
}) => {
	return (
		<Header
			m='0'
			size={size || 'medium'}
		>
			{title}
			{subtitle &&
				<DetailsHeaderSubitle
					text={subtitle}
				/>
			}
		</Header>
	)
}

export default DetailsHeaderTitle
