import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'

const TextArea = styled.textarea`
	width: 100%;
  padding-right: 4px;
  padding-left: 4px;
`

export const HtmlTextArea = ({
  value: propValue,
	onChange,
	...rest
}) => {
  const input = useRef(null)
  const [ value, setValue ] = useState('')
  useEffect(() => setValue(propValue || ''), [propValue])
	return (
		<TextArea
      {...rest}
      ref={input}
			value={value}
      onChange={({ target: { value }}) => setValue(value)}
      onBlur={() => propValue !== value && onChange(value)}
		/>
	)
}
