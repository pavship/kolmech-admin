import React, { useContext } from 'react'

import styled from 'styled-components'
import Batches from './TableCells/Batches'
import Org from './TableCells/Org'
import DetailsContext from '../Details/Provider'
import Deal from './TableCells/Deal'
import { Div } from '../styled/styled-semantic'

const TableHeader = styled.div`
  /* position: absolute;
  top: -1px;
  left: 32px;
  margin-top: 1px; */
  display: flex;
  width: 100%;
  padding: 0 0 0 32px;
  line-height: 1.5em;
  font-weight: bold;
  background: rgb(233, 234, 235);
  border-top: 1px solid #d4d4d5;
  border-bottom: 1px solid #d4d4d5;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  line-height: 1.5em;
  border-bottom: 1px solid rgba(34,36,38,0.15);
  :hover {
    background: rgb(250,250,250);
    color: rgba(0,0,0,.95);
  }
`

export default function DealsTable ({
  deals,
  orgs,
  upsertDeal,
  upsertingDeal,
}) {
  const { setDetails } = useContext(DetailsContext)
  return <>
    <TableHeader>
      <Div w='80px'>#</Div>
      <Div w='90px'>Дата</Div>
      <Div w='170px'>Наименование</Div>
      <Div w='170px'>Контрагент</Div>
    </TableHeader>
    {deals && deals.map(deal => {
      const { id, amoId, date, batches } = deal
      return <Row
        key={id}
      >
        <Div
          w='max-content'
          pos='relative'
        >
          <Div
            d='flex'
            ml='32px'
            bb={batches.length ? '1px solid rgba(34,36,38,0.15);' : undefined}
          >
            <Div
              w='80px'
            >
              {amoId}
            </Div>
            <Div
              w='90px'
            >
              {date}
            </Div>
            <Div
              w='170px'
              whs='nowrap'
              to='ellipsis'
              pos='relative'
            >
              <Deal
                deal={deal}
                setDetails={setDetails}
              />
            </Div>
            <Div
              w='170px'
              whs='nowrap'
              to='ellipsis'
              pos='relative'
            >
              <Org
                deal={deal}
                orgs={orgs}
                upsertDeal={upsertDeal}
                upsertingDeal={upsertingDeal}
                setDetails={setDetails}
              />
            </Div>
          </Div>
          <Div
            pos={!batches.length ? 'absolute' : undefined}
            t={!batches.length ? '0' : undefined}
            l={!batches.length ? '552px' : undefined}
            pl={!batches.length ? '5px' : '32px'}
          >
            <Batches
              deal={deal}
              upsertDeal={upsertDeal}
            />
          </Div>
        </Div>
      </Row>
    })}
  </>
}
