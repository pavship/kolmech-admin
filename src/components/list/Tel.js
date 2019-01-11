import React from 'react'
import { formatTel } from '../../utils/format'

export default ({
  tel
}) => {
  return (
    <div>
      {formatTel(tel)}
    </div>
  )
}
