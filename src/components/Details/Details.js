import React, { useState } from 'react'
import Menu from './Menu/Menu'

export default ({
  details,
  setDetails
}) => {
  return <>
    <Menu
      setDetails={setDetails}
    />
  </>
}