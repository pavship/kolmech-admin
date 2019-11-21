import React from 'react'

import styled from 'styled-components'
import TaskControls from '../../Task/Controls'


const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border-top: 1px solid rgba(34,36,38,0.15);
  min-height: calc(1.5em + 1px);
`

const TitleContainer = styled.div`
  display: flex;
  .taskControlsContainer {
    border-right: 1px solid rgba(34,36,38,0.15);
    transform: translateX(-100%);
  }
  :hover {
    .taskControlsContainer {
      transform: translateX(0);
    }
    .taskControls {
      opacity: 1;
    }
  }
`

const Untruncated = styled.div`
  width: 255px;
  padding-left: 6px;
	text-overflow: ellipsis;
	overflow: hidden;
	box-sizing: content-box;
  color: rgba(0,0,0,.68);
	/* vertical overlay */
	:hover {
		/* position: absolute; */
		/* top: 1px; */
		/* left: -4px; */
		z-index: 1;
		overflow: unset;
		white-space: normal;
		/* background-color: white; */
		/* border: 5px solid rgb(242,242,242); */
    border-top: none;
	}
`

const Title = styled.div`

`

export default function Task ({
  task: { id, text, order },
  upsertAppoint
}) {
  return <Container>
    <TitleContainer>
      <Untruncated>
        {order + 1 + '. ' + text}
      </Untruncated>
      <TaskControls
        taskId={id}
        upsertAppoint={upsertAppoint}
      />
    </TitleContainer>
  </Container>
}