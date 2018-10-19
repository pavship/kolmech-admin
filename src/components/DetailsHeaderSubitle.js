import React from 'react'

import { Span } from './styled-semantic/styled-semantic'

const DetailsHeaderSubitle = ({ text }) => {
	return (
		<Span
			ml='10px'
			fs='1rem'
			c='rgba(0,0,0,.6)'
			ws='0.5em'
		>
			{text}
		</Span>
	)
}

export default DetailsHeaderSubitle
