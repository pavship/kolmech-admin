import React, { useState } from 'react'

import { Query, Mutation } from 'react-apollo'
import { paymentsPage } from '../../graphql/payment'

import styled from 'styled-components'
import PaymentChart from './Chart'
import PaymentForm from './Form'
import PaymentStats from './Stats'
import PaymentTable from './Table'
import { syncWithTochkaPayments } from '../../graphql/tochka'
import { NotificationsConsumer } from '../notifications/NotificationsContext'
import { Button, Icon } from '../styled/styled-semantic'
import { Route, Link, matchPath } from 'react-router-dom'
import Menu from '../Menu'

const Container = styled.div`
  height: calc(100% - 36px);
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const TopSection = styled.div`
  flex: 1 0 content;
  min-height: ${328 + 47.5*2}px;
  display: flex;
  
`

const BottomSection = styled.div`
  flex: 1 1 2000px;
  margin-top: 1rem;
`

export default ({
  refreshToken
}) => {
  const [activePayment, setActivePayment] = useState(null)
  return (
    <NotificationsConsumer>
			{({ notify }) =>
        <Query
          query={paymentsPage}
          onError={err => notify({
            type: 'error',
            title: 'Ошибка загрузки платежей',
            content: err.message,
          })}
        >
          {({ loading: paymentsLoading,
              error,
              data: {
                articles,
                accounts,
                equipments: equipment,
                mpProjects,
                orgs,
                payments,
              } = {},
              refetch: refetchPayments
            }) => <>
              <Mutation
                mutation={syncWithTochkaPayments}
                onCompleted={({ syncWithTochkaPayments: { count } }) => {
                  refetchPayments()
                  notify({
                    type: 'success',
                    title: 'Платежи синхронизированы с банком. Добавлено: ' + count
                  })
                }}
                onError={err => notify({
                  type: 'error',
                  title: 'Ошибка синхронизации с Точкой',
                  content: err.message,
                })}
              >
                {(syncWithTochkaPayments, { loading }) =>
                  <Menu
                    title='Платежи'
                    titleLinkTo='/pay'
                    refreshToken={refreshToken}
                  >
                    <Button compact circular menu
                      w='120px'
                      ml='0'
                      ta='left'
                      activeColor='blue' 
                      onClick={syncWithTochkaPayments}
                    >
                      <Icon
                        name='refresh'
                        color={loading ? 'blue' : undefined} 
                        loading={loading}
                      />
                      {loading ? 'Загрузка..' : 'Точка Банк'}
                    </Button>
                    <Link to={
                      !!matchPath(
                        window.location.href.replace(/.*#/, ''),
                        '/pay/chart'
                      )
                        ? '/pay'
                        : '/pay/chart'
                    }>
                      <Button compact circular menu
                        activeColor='green'
                        icon='chart bar outline'
                        content='График'
                        active={!!matchPath(
                          window.location.href.replace(/.*#/, ''),
                          '/pay/chart'
                        )}
                      />
                    </Link>
                  </Menu>
                }
              </Mutation>
              <Container>
                { paymentsLoading ? 'Загрузка...' :
                  error ? `Ошибка ${error.message}` : <>
                    <TopSection>
                      <Route
                        exact
                        path="/pay"
                        render={() => (<>
                          <PaymentForm
                            articles={articles}
                            equipment={equipment}
                            mpProjects={mpProjects}
                            orgs={orgs}
                            payment={activePayment}
                            reset={() => setActivePayment(null)}
                          />
                          <PaymentStats
                            payments={payments}
                            accounts={accounts}
                            orgs={orgs}
                          />
                        </>)}
                      />
                      <Route
                        exact
                        path="/pay/chart"
                        render={() => (
                          <PaymentChart
                            payments={payments}
                          />
                        )}
                      />
                    </TopSection>
                    <BottomSection>
                      <PaymentTable
                        payments={payments}
                        mpProjects={mpProjects}
                        activePayment={activePayment}
                        onClickRow={id => setActivePayment(payments.find(p => p.id === id))}
                      />
                    </BottomSection>
                  </>
                }
              </Container>
            </>
          }
        </Query>
      }
    </NotificationsConsumer>
  )
}

