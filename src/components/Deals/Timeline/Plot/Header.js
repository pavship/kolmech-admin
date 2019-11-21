import React from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 23px;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
`

export default function Header ({
  days
}) {
  return <Container
    onClick={()=>console.log('plotHeader here!')}
  >
    {days.map(({ key, day }) =>
      <Div
        key={key}
        w='48px'
        c='rgba(0,0,0,.6)'
        ta='center'
      >
        {day}
      </Div>
    )}
  </Container>
}