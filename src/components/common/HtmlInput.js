import React, { useState, useEffect, forwardRef } from 'react'

import styled from 'styled-components'

const Input = styled.input`
	width: 100%;
  padding-right: 4px;
  padding-left: 4px;
`

export default forwardRef(({
  value: propValue,
  onChange,
  onBlur,
	...rest
}, ref) => {
  const [ value, setValue ] = useState('')
  useEffect(() => setValue(propValue || ''), [propValue])
  const submit = () => propValue !== value && onChange(value)
	return (
		<Input
      {...rest}
      ref={ref}
			value={value}
      onChange={({ target: { value }}) => setValue(value)}
      onBlur={() => {
        submit()
        if (onBlur) onBlur()
      }}
      onKeyDown={e => e.key === 'Enter' && submit()}
		/>
	)
})
