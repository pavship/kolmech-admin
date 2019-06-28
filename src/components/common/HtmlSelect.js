import React, { useState, useEffect, forwardRef } from 'react'

import styled from 'styled-components'

const Select = styled.select`
  width: 100%;
  padding-right: 4px;
  padding-left: 4px;
`

export default forwardRef(({
  // value: propValue,
  value,
  onChange,
  options,
	...rest
}, ref) => {
  // const [ value, setValue ] = useState(0)
  // useEffect(() => setValue(propValue || 0), [propValue])
  // const submit = () => propValue !== value && onChange(value)
	return (
    <Select
      {...rest}
      ref={ref}
      value={value}
      onChange={({ target: { value }}) => onChange(value)}
      // onChange={({ target: { value }}) => console.log('value > ', value) || setValue(value)}
      // onBlur={submit}
      // onKeyDown={e => e.key === 'Enter' && submit()}
      // onBlur={() => console.log('ref.current > ', ref.current.blur())}
    >
      {[{ id: 0, name: '' }, ...options].map(({ key, id, name }) =>
        <option key={key || id} value={id}>{name}</option>
      )}}
    </Select>
	)
})
