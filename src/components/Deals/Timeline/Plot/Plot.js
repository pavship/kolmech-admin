import React from 'react'

import styled from 'styled-components'
import posed from 'react-pose'
import { Div } from '../../../styled/styled-semantic'
import Header from './Header'

const Window = styled(Div)`
  position: fixed;
  left: 472px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 5;
`

const Container = styled(posed.div({
  draggable: 'x'
}))`
  position: absolute;
  left: -672px;
  width: 2016px;
  height: calc(100% - 36px);
`

export default function TimelinePlot ({
  budgetMode
}) {
  const startDate = new Date(new Date().setDate(new Date().getDate() - 18))
  const currentHalfHour = Math.floor((Date.now() - startDate.setHours(0,0,0,0))/(30*60000))
  let days = []
  for (
    let d = new Date(startDate), i = 0;
    i < 42;
    d.setDate(d.getDate() + 1), i++
  ) {
    days.push({
      key: i,
      day: d.getDate(),
      isWeekend: [6, 0].includes(d.getDay())
      // isWeekend: d.getDay()
    })
  }
  return <Window>
    <Container
      onClick={()=>console.log('plot here!')}
    >
      <Header
        days={days}
      />
      {days
        .filter(d => d.isWeekend)
        .map(({ key }) =>
          <Div
            key={key}
            pos='absolute'
            t='0'
            l={`${key*48}px`}
            w='48px'
            h='100%'
            bc='rgba(0,0,0,.07)'
          />
      )}
      <Div
        pos='absolute'
        t='0'
        l={`${currentHalfHour}px`}
        w='1px'
        h='100%'
        bc='teal'
      />
    </Container>
  </Window>
}