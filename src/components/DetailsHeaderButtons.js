import React from 'react'

import { Div } from './styled/styled-semantic'

const DetailsHeaderButtons = ({ children }) => {
	return (
		<Div
			ml='auto'
		>
			{children}
		</Div>
	)
}

export default DetailsHeaderButtons
