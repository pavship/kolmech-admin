import React from 'react'

import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Button } from '../styled/styled-semantic'

import GlobalContext from '../context/GlobalContext'

const IconRight = styled(Icon)`
  &&&& { margin: 0 -.42857143em 0 .42857143em; }
`

const ReserveProdsButton = ({ modelId, orderId, prodIds }) => {
  return (
    <GlobalContext>
      {({ extra, setExtra, setSelectedProdIds }) => (
        <Button compact circular menu
          activeColor='green'
          active={!!extra}
          onClick={e => {
            e.stopPropagation()
            setSelectedProdIds(prodIds)
            setExtra({
              type: 'Store',
              modelId,
              orderId
            })
          }}
        >
          <Icon name='gavel' />
          Резервирование
          <IconRight name='angle right' />
        </Button>
      )}
    </GlobalContext>
  )
}

export default ReserveProdsButton