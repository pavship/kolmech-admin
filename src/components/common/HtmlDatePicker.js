import React from 'react'

import styled from 'styled-components'

const Input = styled.input`
	cursor: pointer;
	padding-left: 67.85px;
	/* border-color: rgba(34,36,38,0.15); */
`

export default ({
	onChange,
	...rest
}) => {
	return (
		<Input
			{...rest}
			// type="date"
			onChange={({ target: { value }}) => onChange(value)}
		/>
	)
}
