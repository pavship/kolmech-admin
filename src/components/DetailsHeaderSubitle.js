import React from 'react'

import { Span } from './styled/styled-semantic'

const DetailsHeaderSubitle = ({ content }) => {
	return (
		<Span
			ml='10px'
			fs='1rem'
			c='rgba(0,0,0,.6)'
			ws='0.5em'
		>
			{content}
		</Span>
	)
}

export default DetailsHeaderSubitle
