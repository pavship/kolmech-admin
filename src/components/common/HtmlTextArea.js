import React, { useState, useEffect, useRef } from 'react'
import debounce from 'lodash/debounce'

import styled from 'styled-components'

const TextArea = styled.textarea`
	width: 100%;
  padding-right: 4px;
  padding-left: 4px;
`

export const HtmlTextArea = ({
  value: propValue,
  onChange,
	debouncedWrite,  
	...rest
}) => {
  const input = useRef(null)
  const [ value, setValue ] = useState('')
  useEffect(() => setValue(propValue || ''), [propValue])
  const debouncedOnChange = debounce(onChange, 500)
	return (
		<TextArea
      {...rest}
      ref={input}
			value={value}
      onChange={({ target: { value }}) => {
        setValue(value)
        if (debouncedWrite) debouncedOnChange()
      }}
      onBlur={() => propValue !== value && onChange(value)}
		/>
	)
}
