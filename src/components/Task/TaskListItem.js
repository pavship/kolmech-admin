import React from 'react'

import styled from 'styled-components'
import { Div, Icon } from '../styled/styled-semantic'
import TaskControls from './Controls'

const Container = styled.div`
  display: flex;
  padding: 0 1em 0 55px;
	cursor: pointer;
	border-width: 1px 0;
	border-style: solid;
	border-color: white;
  :hover {
    background: rgb(250, 250, 250);
    color: rgba(0,0,0,.95);
    .taskControls {
      opacity: 1;
    }
  }
  ${props => props.active && `
		background: rgba(0,0,0,.05);
		font-weight: bold;
		border-color: rgba(34, 36, 38, 0.15);
  `}
`

export function TaskListItem ({
  task: { text, order },
  upsertAppoint
}) {
  return <Container>
    <Div
      w='25px'
    >{order + 1}.</Div>
    <Div>
      {text}
    </Div>
    <TaskControls
      upsertAppoint={upsertAppoint}
    />
  </Container>
}