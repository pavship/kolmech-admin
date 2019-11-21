import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'

const Input = styled.input`
  width: 40px;
`

export default ({
  deal,
  batch: { id: batchId, qty: iniQty },
  upsertDeal
}) => {
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const [ qty, setQty ] = useState(iniQty)
  return editMode
  ? <Input
      ref={inputRef}
      placeholder='1'
      value={qty}
      onChange={({ target: { value }}) => setQty(value)}
      onBlur={async () => {
        if (qty !== iniQty)
          await upsertDeal([ `batches[id=${batchId}].qty`, qty ])
        setEditMode(false)
      }}
    />
  : <Div
      pl='4px'
      onClick={() => setEditMode(true)}
    >
      {qty} шт
    </Div>
}