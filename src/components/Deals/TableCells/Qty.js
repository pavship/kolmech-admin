import React, { useState, useEffect, useRef } from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic';

const Input = styled.input`
  width: 40px;
`

export default ({
  deal,
  batch,
  upsertDeal
}) => {
  const { id: batchId, isNew: isNewBatch, qty: iniQty } = batch
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  const [ qty, setQty ] = useState(iniQty)
  return editMode
  ? <Input
      ref={inputRef}
      placeholder='0'
      value={qty}
      onChange={({ target: { value }}) => setQty(value)}
      onBlur={async () => {
        if (qty !== iniQty)
          await upsertDeal({ variables: { input: {
            id: deal.id,
            batches: [
              ...deal.batches.map(({ id }) => ({ id })).filter(b => b.id !== batchId),
              { id: batchId, qty }
            ]
          }}})
        // else setEditMode(false)
        setEditMode(false)
      }}
    />
  : <Div
      pl='4px'
      onClick={() => setEditMode(true)}
    >
      {!isNewBatch ? qty : ''}
    </Div>
}