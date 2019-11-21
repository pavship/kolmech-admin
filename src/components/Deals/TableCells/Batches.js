import React from 'react'
import cuid from 'cuid'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'
import styled from 'styled-components'
import Batch from'./Batch'
import Model from './Model'
import { Div } from '../../styled/styled-semantic'
import useUpsert from '../../hooks/useUpsert'

const SortableItemContainer = styled(Div)`
  :hover {
    .dragHandle {
      opacity: 1 !important;
    }
  }
`

const SortableContainer = sortableContainer(({children}) => <div>{children}</div>)

const DragHandle = sortableHandle(() =>
  <Div
    className='dragHandle'
    w='32px'
    ml='-32px'
    o='0'
    c='rgba(0,0,0,.6)'
    fw='bold'
    ta='center'
    lh='initial'
    cur='move'
    tr='opacity 0.25s ease-in-out'
  >::</Div>
)

const SortableBatch = sortableElement(props => (
  <SortableItemContainer
    d='flex'
    z='99'
  >
    <DragHandle />
    <Batch {...props} />
  </SortableItemContainer>
))

export default function Batches ({
  deal
}) {
  const { batches } = deal
  const [ upsertDeal ] = useUpsert('deal', deal)
  return <>
    <SortableContainer
      onSortEnd={({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return
        upsertDeal([
          `batches[id=${batches[oldIndex].id}]`, { sort: newIndex },
          `batches[id=${batches[newIndex].id}]`, { sort: oldIndex }
        ])
      }}
      useDragHandle
    >
      {deal.batches
        .map((batch, index) =>
          <SortableBatch
            key={batch.id}
            index={index}
            deal={deal}
            batch={batch}
            upsertDeal={upsertDeal}
          />)
      }
    </SortableContainer>
    <Model
      key={cuid()}
      batch={{isNew: true}}
      deal={deal}
      upsertDeal={upsertDeal}
    />
  </>
}