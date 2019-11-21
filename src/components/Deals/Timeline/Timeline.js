import React from 'react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'

const Container = styled(Div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg,rgba(0,0,0,.01) 0%,rgba(200,201,202,1) 100%);
  box-shadow: inset 0 0 20px rgba(34,36,38,.15);
  z-index: -1;
  transition: all 0.5s ease;
`

export default function Timeline ({
  budgetMode
}) {
  return <Container
    l={budgetMode ? '1142px' : '472px'}
    onClick={()=>console.log('container here!')}
  >
  </Container>
}