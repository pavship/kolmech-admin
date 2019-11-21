import React, { useContext } from 'react'

import { Div } from '../styled/styled-semantic'
import styled from 'styled-components'
import Row from './Row'
import { DealsContext } from './context/Context';

const TableHeader = styled(Div)`
  position: fixed;
  display: flex;
  /* width: 542px; */
  padding: 0 0 0 32px;
  line-height: 1.5em;
  font-weight: bold;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
  pointer-events: auto;
  z-index: 15;
  transition: width .5s ease;
`

const Background = styled(Div)`
  position: fixed;
  height: 100%;
  background: white;
  z-index: -1;
  transition: width .5s ease;
`

export default function DealsTable ({
  deals,
}) {
  const { budgetMode } = useContext(DealsContext)
  return <Div
    pos='absolute'
    // t='23px'
    w='100%'
    // h='calc(100% - 23px)'
    h='100%'
    pe='none'
    z='10'
  >
    <TableHeader
      // w={budgetMode ? '1142px' : '542px'}
      w={budgetMode ? '1142px' : '472px'}
    >
      <Div w='80px'>#</Div>
      <Div w='90px'>Дата</Div>
      <Div w='170px'>Наименование</Div>
      <Div w='100px'>Контрагент</Div>
    </TableHeader>
    <Background
      w={budgetMode ? '1142px' : '372px'}
    />
    <Div
      h='calc(100% - 23px)'
      // h='100%'
      mt='23px'
      // oy='scroll'
    >
      {deals && deals.map((deal, i) =>
        <Row
          key={deal.id}
          isFirstRow={i === 0}
          deal={deal}
          budgetMode={budgetMode}
        />
      )}
      <Div
        h='400px'
        w='472px'
        bc='white'
      />
    </Div>
  </Div>
}
