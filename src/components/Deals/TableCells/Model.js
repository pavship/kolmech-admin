import React, { useState, useEffect, useRef } from 'react'

import { Div, Icon } from '../../styled/styled-semantic'
import HtmlInput from '../../common/HtmlInput'

export default ({
  batch: { id: batchId, isNew: isNewBatch},
  deal: { id: dealId, batches },
  model: { id, name } = {},
  upsertDeal
}) => {
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  if (editMode)
    return <HtmlInput
      ref={inputRef}
      placeholder='Новое Изделие'
      value={name || ''}
      onChange={value => upsertDeal({ variables: { input: {
        id: dealId,
        batches: [
          ...batches.map(({ id }) => ({ id })).filter(b => b.id !== batchId),
          {
            ...isNewBatch
              ? { qty: 0 }
              : { id: batchId },
            model: {
              ...!isNewBatch && { id },
              name: value,
            }
          }
        ]
      }}})}
    />
  else if (isNewBatch)
    return <Icon
      link
      name='plus'
      // c='rgba(50,50,50,.87)'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
      to='ellipsis'
      onClick={() => setEditMode(true)}
    >
      {name}
    </Div>
}