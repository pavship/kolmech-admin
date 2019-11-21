import React, { useContext } from 'react'
import { useMutation } from '../../hooks/apolloHooks'
import { upsertBatch as uBq } from '../../../graphql/batch'
import useUpsert from '../../hooks/useUpsert'
import { getStructure, assignNested } from '../../form/utils'
import produce from 'immer'

import { DealsContext } from '../context/Context'

import styled from 'styled-components'
import { Div, Icon } from '../../styled/styled-semantic'
import Model from './Model'
import Qty from './Qty'
import BpStat from './BpStat/BpStat'
import Elements from './Element/Elements'

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(34,36,38,0.15);
  line-height: 1.5em !important;
`

const TitleContainer = styled.div`
  position: relative;
  width: 311px;
  border-right: 1px solid rgba(34,36,38,0.15);
`

const ContolsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.25s linear;
  ${TitleContainer}:hover & {
    opacity: 1;
  }
`

export default React.memo(function Batch ({
  deal,
  batch,
  upsertDeal,
}) {
  const { batches } = deal
  const { budgetMode } = useContext(DealsContext)
  const [ upsertBatchProto ] = useMutation(uBq)
  const upsertBatch = (draftHandler, options) =>
    upsertBatchProto({ variables: { input:
      produce(getStructure(batch), draftHandler)
    }, options})
  const { id, bpStat, elements, model } = produce(batch, draft => {
    const batchAutoStat = {
      planCost: 0,
      planLabor: 0,
      planRevenue: 0,
    }
    const evalOp = (op, batchAutoStat) => {
      for (let ap of op.appoints) {
        if (!ap.bpStat) ap.bpStat = {}
        const { bpStat, laborCost } = ap
        const {
          autoPlanCost,
          autoPlanLabor,
          autoPlanRevenue,
        } = bpStat
        if (autoPlanLabor !== false)
          bpStat.planLabor = op.dealLabor
        if (autoPlanCost !== false)
          if (laborCost && bpStat.planLabor)
            bpStat.planCost = laborCost*bpStat.planLabor
          else bpStat.planCost = undefined
        if (autoPlanRevenue !== false)
          if (op.laborPrice && op.dealLabor)
            bpStat.planRevenue = op.laborPrice*op.dealLabor
          else bpStat.planRevenue = undefined
        for (let key of ['planCost', 'planLabor', 'planRevenue']) {
          if (bpStat[key]) batchAutoStat[key] += bpStat[key]
        }
      }
    }
    for (const { op, proc } of draft.elements) {
      if (op)
        evalOp(op, batchAutoStat)
      if (proc)
        for (let op of proc.ops) evalOp(op, batchAutoStat)
    }
    if (!draft.bpStat) draft.bpStat = batchAutoStat
    else
      for (let key of ['autoPlanCost', 'autoPlanLabor', 'autoPlanRevenue']) {
        if (draft.bpStat[key] !== false)
          draft.bpStat['p'+key.slice(5)] = batchAutoStat['p'+key.slice(5)]
      }
  })
  return <Container>
    <Div
      d='flex'
      bb='1px solid rgba(34, 36, 38, 0.15)'
    >
      <TitleContainer>
        <Model
          batch={batch}
          deal={deal}
          model={model}
          upsertDeal={upsertDeal}
        />
        <ContolsContainer>
          <Icon
            link
            name='trash'
            color='grey'
            activeColor='red'
            onClick={() => {
              let modifierArr = [ `batches[id=${id}]`, {} ]
              batches
                .filter(b => b.id !== id)
                .forEach((b, i) => {
                  modifierArr = [...modifierArr, `batches[id=${b.id}]`, { sort: i }]
                })
              upsertDeal(modifierArr)
            }}
          />
        </ContolsContainer>
      </TitleContainer>
      <Div
        w='50px'
      >
        <Qty
          deal={deal}
          batch={batch}
          upsertDeal={upsertDeal}
        />
      </Div>
      <BpStat
        bpStat={bpStat}
        upsertParent={upsertBatch}
        budgetMode={budgetMode}
      />
    </Div>
    <Div
      pl='19px'
      bl='1px solid rgba(34, 36, 38, 0.15)'
    >
      <Elements
        batch={batch}
        elements={elements}
        upsertBatch={upsertBatch}
        modelId={model.id}
        budgetMode={budgetMode}
      />
    </Div>
  </Container>
})