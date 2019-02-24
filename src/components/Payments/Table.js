import React from 'react'

import Table from '../common/Table'
import TableRow from '../common/TableRow'

import styled from 'styled-components'

const Container = styled.div`
  margin-top: 1rem;
  max-height: 100%;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: 0.285714rem;
  .fz-tableHeaderRow {
    border-top: none !important;
  }
`

const fields = [{
  name: 'article',
  path: 'article.rusName',
	title: 'Статья',
	width: '180px'
},{
  name: 'person',
  path: 'person.amoName',
  title: 'Контрагент',
  width: '200px'
},{
  name: 'amount',
  path: 'amount',
  title: 'Сумма',
  width: '140px'
}]

export default ({
  payments
}) => {
  //  TODO add CollectionUtils to support sorting
  return (
    <Container>
      <Table
        fields={fields}
      >
        {({ tableFields }) => 
          payments.map(payment => {
            const { id, amount,  article: { isIncome } } = payment
            return (
              <TableRow
                key={id}
                entity={payment}
                tableFields={tableFields}
                rowFields={[
                  {
                    name: 'amount',
                    value: isIncome ? amount : -amount,
                    color: isIncome ? '#016936' : '#9f3a38'
                  }
                ]}
              />
            )
          }
        )}
      </Table>
    </Container>
  )
}
