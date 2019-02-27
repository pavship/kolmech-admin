import React from 'react'

import Drawings from './Details/Drawings'

export default ({
  model,
  sidebarRef
}) => {
  return <>
    <Drawings
      model={model}
      sidebarRef={sidebarRef}
    />
  </>
}
