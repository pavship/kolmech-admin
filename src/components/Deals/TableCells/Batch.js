import React from 'react'
import { useMutation } from '../../hooks/apolloHooks'
import { upsertBatch as uBq } from '../../../graphql/batch'
import { getStructure } from '../../form/utils'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import Model from './Model'
import Qty from './Qty'
import ProcOps from './ProcOps'
import produce from 'immer'

const BatchContainer = styled.div`
  display: flex;
  width: calc(170px + 170px + 170px);
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

export default function Batch ({
  deal,
  batch,
  upsertDeal,
}) {
  const { isNew, ops, procs, model } = batch
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = (draftHandler, options = {}) => upsertBatchProto({ variables: { input:
    produce(getStructure(batch), draftHandler)
  }, ...options})
  return <BatchContainer>
    <Div
      w='130px'
      br={isNew ? undefined : '1px solid rgba(34,36,38,0.15);'}
    >
      <Model
        batch={batch}
        deal={deal}
        model={model}
        upsertDeal={upsertDeal}
      />
    </Div>
    {!isNew && <>
      <Div
        w='40px;'
      >
        <Qty
          deal={deal}
          batch={batch}
          upsertDeal={upsertDeal}
        />
      </Div>
      <Div
        w='calc(170px+140px)'
      >
        <ProcOps
          modelId={model.id}
          ops={ops}
          procs={procs}
          upsertBatch={upsertBatch}
        />
      </Div>
    </>}
  </BatchContainer>
}