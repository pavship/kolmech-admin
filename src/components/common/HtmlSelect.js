import React, { useState, useEffect, forwardRef } from 'react'

import styled from 'styled-components'

const Select = styled.select`
  width: 100%;
  padding-right: 4px;
  padding-left: 4px;
`

export default forwardRef(({
  value,
  onChange,
  options,
  undefinedOptionName = '--',
	...rest
}, ref) => {
	return (
    <Select
      {...rest}
      ref={ref}
      value={value}
      onChange={({ target: { value }}) => onChange(value)}
    >
      {[
        // ...hasNoUndefinedOption ? [] : [{ id: -1, name: '--' }],
        { id: -1, name: undefinedOptionName },
        ...options
      ].map(({ key, id, name }) =>
        <option key={key || id} value={id}>{name}</option>
      )}}
    </Select>
	)
})
