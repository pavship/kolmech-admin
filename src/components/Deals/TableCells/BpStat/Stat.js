import React, { useState, useEffect, useRef } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import HtmlInput from '../../../common/HtmlInput'
import { currency } from '../../../../utils/format'

export default function Stat ({
  value,
  isAuto,
  type,
  onChange,
  onAutoEnable,
}) {
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  return editMode
  ? <HtmlInput
      ref={inputRef}
      placeholder='0'
      value={value || ''}
      onChange={value => onChange(value)}
      onBlur={() => setEditMode(false)}
    />
  : <Div
      pl='2px'
      onClick={() => setEditMode(true)}
    >
      {isAuto === false &&
        <Icon
          link
          activeColor='red'
          name='hand paper'
          size='small'
          fl='left'
          m='2px auto 0 1px'
          color='grey'
          onClick={e => {
            e.stopPropagation()
            onAutoEnable()
          }}
        />
      }
      { type === 'currency'
        ? isAuto !== false && value === 0
          ? '- ₽'
          : currency(value)
        : (
        type === 'labor'
          ? isAuto !== false && !value
            ? '- / - ч '
            : '- /' + value + ' ч'
          : value
        )
      }
    </Div>
}