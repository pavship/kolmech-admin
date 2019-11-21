import React from 'react'
import cuid from 'cuid'
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import Element from './Element'
import NewElement from './NewElement'
import useUpsert from '../../../hooks/useUpsert'

const SortableItemContainer = styled(Div)`
  :hover {
    .elementDragHandle {
      opacity: 1 !important;
    }
  }
`

const SortableContainer = sortableContainer(({children}) => {return <div>{children}</div>})

const DragHandle = sortableHandle(() =>
  <Div
    className='elementDragHandle'
    w='19px'
    ml='-19px'
    o='0'
    c='rgba(0,0,0,.6)'
    fw='bold'
    ta='center'
    lh='initial'
    cur='move'
    tr='opacity 0.25s ease-in-out'
  >::</Div>
)

const SortableElement = sortableElement(props => (
  <SortableItemContainer
    d='flex'
    z='99'
  >
    <DragHandle />
    <Element {...props} />
  </SortableItemContainer>
))

export default function Elements ({
  batch,
  elements,
  upsertBatch: upsertBatchDeprecated,
  modelId,
  budgetMode,
}) {
  const [ upsertBatch ] = useUpsert('batch', batch)
  return <>
    <SortableContainer
      onSortEnd={({oldIndex, newIndex}) => {
        if (oldIndex === newIndex) return
        upsertBatch([
          `elements[id=${elements[oldIndex].id}]`, { sort: newIndex },
          `elements[id=${elements[newIndex].id}]`, { sort: oldIndex }
        ])
      }}
      useDragHandle
    >
      {elements.map((element, index) =>
        <SortableElement
          key={element.id}
          index={index}
          element={element}
          upsertBatch={upsertBatchDeprecated}
          deleteElement={() => {
            const { id } = element
            let modifierArr = [ `elements[id=${id}]`, {} ]
            elements
              .filter(b => b.id !== id)
              .forEach((b, i) => {
                modifierArr = [...modifierArr, `elements[id=${b.id}]`, { sort: i }]
              })
            upsertBatch(modifierArr)
          }}
          budgetMode={budgetMode}
        />
      )}
    </SortableContainer>
    <Div
      w='170px'
    >
      <NewElement
        key={cuid()}
        batch={batch}
        modelId={modelId}
        opClass='SURVEY'
        upsertBatch={upsertBatch}
        newElementIndex={elements.length}
      />
    </Div>
  </>
}