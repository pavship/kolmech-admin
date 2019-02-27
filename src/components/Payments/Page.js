import React from 'react'

import { Query } from 'react-apollo'
import { paymentsPage } from '../../graphql/payment'

import styled from 'styled-components'
import PaymentForm from './Form'
import PaymentStats from './Stats'
import PaymentTable from './Table'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const TopSection = styled.div`
  flex: 1 0 content;
  min-height: ${308 + 47.5*2}px;
  display: flex;
`

const BottomSection = styled.div`
  flex: 1 1 2000px;
  margin-top: 1rem;
`

export default ({
  
}) => {
  return (
    <Query
      query={paymentsPage}
    >
      {({ loading, error, data: {
        payments,
        articles,
        accounts,
        equipments: equipment
      }}) => 
        <Container>
          { loading ? 'Загрузка...' :
            error ? `Ошибка ${error.message}` : <>
              <TopSection>
                <PaymentForm
                  articles={articles}
                  equipment={equipment}
                />
                <PaymentStats
                  payments={payments}
                  accounts={accounts}
                />
              </TopSection>
              <BottomSection>
                <PaymentTable
                  payments={payments}
                />
              </BottomSection>
            </>
          }
        </Container>
      }
    </Query>
  )
}

