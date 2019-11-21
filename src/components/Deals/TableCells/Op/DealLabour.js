import React, { useState, useEffect, useRef } from 'react'

import { Div } from '../../../styled/styled-semantic'
import { assignNested } from '../../../form/utils'
import HtmlInput from '../../../common/HtmlInput'

export default ({
  basePath,
  dealLabor,
  upsertBatch,
}) => {
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  return editMode
  ? <HtmlInput
    ref={inputRef}
    placeholder='0'
    value={dealLabor || ''}
    onChange={value => {
      upsertBatch(draft => {
        assignNested(draft, `${basePath}dealLabor`, value)
      })
    }}
    onBlur={() => setEditMode(false)}
  />
  : <Div
      pl='4px'
      onClick={() => setEditMode(true)}
    >
      {dealLabor} ч
    </Div>
}