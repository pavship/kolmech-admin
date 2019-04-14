import React from 'react'

import { XAxis, YAxis, HorizontalGridLines, LineSeries, VerticalBarSeries, FlexibleWidthXYPlot } from 'react-vis'

import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

export default ({
  payments: allPayments
}) => {
  const payments = allPayments.filter(p => !p.article || !p.article.isLoan)
  // const startDate = payments[payments.length - 1].dateLocal.slice(0, 10)
  // const endDate = payments[0].dateLocal.slice(0, 10)
  // console.log('startDate > ', startDate)
  // console.log('endDate > ', endDate)
  // console.log('payments > ', payments)
  const data = payments.map(p => {
    const isIncome = p.article ? p.article.isIncome : p.isIncome
    return {
      x: new Date(p.dateLocal.slice(0, 10)).getTime(),
      y: (!!isIncome ? 1 : -1) * p.amount
    }
  })
  const [positive, negative, total] = data.reduce((arrs, p) => {
    let length = arrs[0].length
    if (!length || arrs[0][length - 1].x !== p.x) {
      arrs.forEach(arr => arr.push({ x: p.x, y: 0, y0: 0 }))
      length = arrs[0].length
    }
    if (p.y > 0) arrs[0][length - 1].y += p.y
    if (p.y < 0) {
      arrs[1][length - 1].y0 += p.y
    }
    arrs[2][length - 1].y += p.y
    return arrs
  }, [[], [], []])
  // console.log('positive, negative, total > ', positive, negative, total)
  let sum = 0
  const lineData = total.reverse().reduce((lineData, p) => {
    const pointIndex = (
      lineData.findIndex(({ x }) => x === p.x) + 1
      || lineData.push({ x: p.x, y: sum }) && lineData.push({ x: p.x, y: 0 })
    ) - 1
    lineData[pointIndex].y = sum += p.y
    return lineData
  }, [])
  const negativeValues = negative.map(p => ({
    ...p,
    y: 0,
    y0: p.y < 0 ? p.y : 0
  }))
  return (
    <Container>
      <FlexibleWidthXYPlot
        height={400}
        margin={{
          left: 60
        }}
        stackBy="y"
      >
        <HorizontalGridLines />
        <XAxis 
          tickFormat={(d) => new Date(d).toLocaleDateString()}
        />
        <YAxis />
        <LineSeries
          data={lineData}
        />
        <VerticalBarSeries
          stack={true}
          // cluster='1'
          data={negative}
          color='rgb(255, 152, 51)'
        />
        <VerticalBarSeries
          stack={true}
          // cluster='0'
          data={positive}
          color='#4fb79b'
        />
      </FlexibleWidthXYPlot>
    </Container>
  )
}
