import React from 'react'

import { Icon } from 'semantic-ui-react'
import { Button } from '../styled-semantic/styled-semantic'
import styled from 'styled-components'

const SButton = styled(Button)`
	padding: .78571429em !important;
	&>i {
		opacity: .9 !important;
		margin: 0 !important;
	}
`

const RefreshButton = ({ loading, onClick }) => {
	return (
		<SButton
			activeColor='blue'
			active={loading}
			onClick={onClick} >
			<Icon 
				name='refresh'
				loading={loading} 
			/>
		</SButton>
	)
}

export default RefreshButton
