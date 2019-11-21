import React from 'react'

import styled from 'styled-components'

import Proc from'../Proc'
import { Ops } from '../Op/Ops'
import { Op } from '../Op/Op';
import { Div } from '../../../styled/styled-semantic'

const Container = styled(Div)`
  width: 100%;
  border-bottom: 1px solid rgba(34,36,38,0.15);
  line-height: 1.5em !important;
`

export default function Element ({
  element: { id, op, proc },
  upsertBatch,
  deleteElement,
  budgetMode
}) {
  return <Container
    // w={budgetMode ? '1100px' : '430px'}
  >
    {op &&
      <Op
        op={op}
        opClass='SURVEY'
        basePath={`elements[id=${id}].`}
        upsertBatch={upsertBatch}
        deleteElement={deleteElement}
        budgetMode={budgetMode}
      />
    }
    {proc && <>
      <Proc
        proc={proc}
        upsertBatch={upsertBatch}
        deleteElement={deleteElement}
      />
      {!proc.isNew &&
        <Ops
          basePath={`elements[id=${id}].proc.`}
          ops={proc.ops}
          upsertBatch={upsertBatch}
          budgetMode={budgetMode}
        />
      }
    </>}
  </Container>
}