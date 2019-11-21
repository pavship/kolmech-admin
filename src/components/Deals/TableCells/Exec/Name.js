import React, { useState, useContext } from 'react'

import { Div, Icon } from '../../../styled/styled-semantic'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'

export default function ExecName ({
  basePath,
  appoint,
  opIndex,
  opType: { id: opTypeId, laborCost },
  upsertBatch
}) {
  const { isNew: isNewAppoint, exec: { person: { id, amoName } = {} } = {} } = appoint
  const { setDetails } = useContext(DetailsContext)
  const [ addMode, setAddMode ] = useState(false)
  return <Div
    ov='hidden'
    to='ellipsis'
    pl='6px'
  >
    {isNewAppoint
      ? <Icon
          // TODO fix addMode not recognized as truthy
          c={addMode ? 'green' : 'rgba(50,50,50,.87)'}
          link
          name='plus'
          activeColor='green'
          onClick={() => {
            setAddMode(true)
            setDetails({
              type: 'SelectExec',
              opTypeId,
              onSubmit: execId => {
                upsertBatch(draft => {
                  assignNested( draft,
                    basePath + `appoints[length]`,
                    { execId, ...laborCost && { laborCost } }
                  )
                })
              }
            })
          }}
        />
      : amoName
    }
  </Div>
}