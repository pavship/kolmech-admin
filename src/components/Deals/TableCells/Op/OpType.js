import React, { useState, useEffect, useRef, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import { DealsContext } from '../../context/Context'
import HtmlSelect from '../../../common/HtmlSelect'
import { assignNested } from '../../../form/utils'

export default function OpType ({
  path,
  isNewOp,
  opClass,
  opType: { id: opTypeId, name, laborPrice } = {},
  upsertBatch
}) {
  const { opTypes } = useContext(DealsContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  const isMachiningClass = opClass === 'MACHINING'
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  if (editMode)
    return <HtmlSelect
      ref={inputRef}
      value={opTypeId}
      options={opTypes.filter(ot => ot.opClass === opClass)}
      onChange={opTypeId => upsertBatch(draft => {
        const laborPrice = opTypes.find(opt => opt.id === opTypeId).laborPrice
        assignNested(draft, path, {
          opTypeId,
          ...laborPrice && { laborPrice }
        })
      })}
      onBlur={() => setEditMode(false)}
    />
  else if (isNewOp)
    return <Icon
      ml={isMachiningClass ? '6px' : undefined}
			c='rgba(50,50,50,.87)'
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Div
      ov='hidden'
			to='ellipsis'
			pl={isMachiningClass ? '6px' : undefined}
    >
      {name}
    </Div>
}