import React, { useState, useEffect, useRef, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import { DealsContext } from '../../context/Context'
import HtmlSelect from '../../../common/HtmlSelect'
import { assignNested } from '../../../form/utils'

export default function OpType ({
  basePath,
  isNewOp,
  opClass,
  opType = {},
  upsertBatch
}) {
  const { id: opTypeId, name } = opType
  const { opTypes } = useContext(DealsContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  if (editMode)
    return <HtmlSelect
      ref={inputRef}
      value={opTypeId}
      options={opTypes.filter(ot => ot.opClass === opClass)}
      onChange={opTypeId => upsertBatch(draft => {
        assignNested(draft, basePath + 'ops[length]', { opTypeId })
      })}
      onBlur={() => setEditMode(false)}
    />
  else if (isNewOp)
    return <Icon
      ml='6px'
			// color='grey'
			c='rgba(50,50,50,.87)'
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
			to='ellipsis'
			pl='6px'
    >
      {name}
    </Div>
}