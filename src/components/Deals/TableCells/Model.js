import React, { useState, useEffect, useRef } from 'react'

import { Div, Icon } from '../../styled/styled-semantic'
import HtmlInput from '../../common/HtmlInput'

export default ({
  deal,
  batch: { id: batchId, isNew: isNewBatch},
  model: { name } = {},
  upsertDeal
}) => {
  const { batches } = deal
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
      onChange={value => value !== '' && upsertDeal([
        isNewBatch
            ? 'batches[length]'
            : `batches[id=${batchId}].model`,
        isNewBatch
          ? { qty: 1, sort: batches.length, model: { name: value } }
          : { name: value }
      ])}
      onBlur={() => setEditMode(false)}
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
      fw='bold'
      onClick={() => setEditMode(true)}
    >
      {name}
    </Div>
}