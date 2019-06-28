import React, { useState } from 'react'
import cuid from 'cuid'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import OpType from './OpType'
import DealLabour from './DealLabour'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import Appoint from '../Appoint/Appoint'
import { assignNested } from '../../../form/utils'

const FlexContainer = styled.div`
  display: flex;
`

const WarningItem = styled(Dropdown.Item)`
  :hover {
    color: #9f3a38 !important;
    .icon {
      color: #9f3a38 !important;
    }
  }
`

export const Op = ({
  basePath = '',
  op,
  opClass,
  opIndex,
  upsertBatch
}) => {
  const { isNew, appoints, opType, dealLabor } = op
  const isMachiningClass = basePath.startsWith('procs')
  const [isHovered, setIsHovered] = useState(false)
  return <>
    <FlexContainer>
      <Div
        d='flex'
        w={isMachiningClass ? '130px' : '170px'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Div
          w={!isNew && isHovered ? (isMachiningClass ? '100px' : '140px') : '100%'}
          whs='nowrap'
          to='ellipsis'
          pos='relative'
        >
          <OpType
            basePath={basePath}
            opType={opType}
            opClass={opClass}
            isNewOp={isNew}
            upsertBatch={upsertBatch}
          />
        </Div>
        {!isNew && isHovered &&
          <DropdownMenu>
            <WarningItem
              icon='trash'
              text='Удалить'
              onClick={() => upsertBatch(draft => {
                assignNested(draft, basePath + `ops[${opIndex}]`, {})
              })}
            />
          </DropdownMenu>
        }
      </Div>
      {!isNew && isMachiningClass &&
        <Div
          w='40px'
          bl='1px solid rgba(34,36,38,0.15);'
        >
          <DealLabour
            dealLabor={dealLabor}
            opIndex={opIndex}
            upsertBatch={upsertBatch}
          />
        </Div>
      }
      {!isNew && 
        <Div
          w='170px'
        >
          {[
            ...appoints,
            { id: cuid(), isNew: true }
          ].map((appoint, i) =>
            <Appoint
              key={appoint.id}
              basePath={basePath}
              appoint={appoint}
              appointIndex={i}
              op={op}
              opIndex={opIndex}
              upsertBatch={upsertBatch}
            />
          )}
        </Div>
      }
    </FlexContainer>
  </>
}