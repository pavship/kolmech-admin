import React from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic';


const Container = styled(Div)`
  position: absolute;
  top: 2px;
  height: 16px;
  border-radius: 8px;
  pointer-events: auto;
`

export default function Task ({
  task
}) {
  return <Container
    l='100px'
    w='200px'
    bc='rgba(68,114,196,.5)'
  >
  </Container>
}