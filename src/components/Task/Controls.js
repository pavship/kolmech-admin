import React from 'react'

import styled from 'styled-components'
import { Div, Icon } from '../styled/styled-semantic'
import { assignNested } from '../form/utils'

const Container = styled.div`
  width: 25px;
  margin-left: auto;
  transition: transform 0.25s linear;
`

const ContolsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.25s linear;
`

export default function TaskControls ({
  taskId,
  upsertAppoint
}) {
    return <Container
      className='taskControlsContainer'
    >
      <ContolsContainer
        className='taskControls'
      >
        <Icon
          link
          name='trash'
          color='grey'
          activeColor='red'
          onClick={() => upsertAppoint(draft => {
            assignNested(draft, `tasks[id=${taskId}]`, {})
          })}
        />
      </ContolsContainer>
    </Container>
  }