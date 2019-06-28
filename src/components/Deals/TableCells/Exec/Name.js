import React, { useState, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'

export default function ExecName ({
  basePath,
  appoint,
  opIndex,
  opTypeId,
  upsertBatch
}) {
  const { setDetails } = useContext(DetailsContext)
  const { isNew: isNewAppoint, exec: { person: { amoName } = {} } = {} } = appoint
  const [ addMode, setAddMode ] = useState(false)
  if (isNewAppoint)
    return <Icon
      ml='6px'
      // TODO fix addMode not recognized as truthy
			c={addMode ? 'green' : 'rgba(50,50,50,.87)'}
      link
      name='plus'
      activeColor='green'
      // active={addMode}
      onClick={() => {
        setAddMode(true)
        setDetails({
          type: 'SelectExec',
          opTypeId,
          onSubmit: execId => {
            upsertBatch(draft => {
              assignNested( draft,
                basePath + `ops[${opIndex}].appoints[length]`,
                { execId }
              )
            })
          }
        })
      }}
    />
  else
    return <Div
      ov='hidden'
			to='ellipsis'
			pl='6px'
    >
      {amoName}
    </Div>
}