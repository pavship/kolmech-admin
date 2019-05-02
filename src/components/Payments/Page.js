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
import { Button, Icon, Div } from '../styled/styled-semantic'
import { Route, Link, matchPath } from 'react-router-dom';

const Header = styled.div`
	display: flex;
	align-items: center;
	height: 52px;
	padding: 0 2rem;
	font-size: 1.28571429rem;
	line-height: 1.28571429em;
	font-weight: bold;
	border-bottom: 1px solid rgba(34,36,38,.15);
`

const SLink = styled(Link)`
  color: rgba(0,0,0,.87) !important;
`

const Container = styled.div`
  height: calc(100% - 52px);
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

export default () => {
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
                payments,
                articles,
                orgs,
                accounts,
                equipments: equipment
              },
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
                  <Header>
                    <SLink to="/pay">Платежи</SLink>
                    <Div
                      ml='40px'
                    >
                      <SLink to="/pay/chart">
                        <Icon
                          link
                          name='chart bar outline'
                          size='large'
                          active={!!matchPath(
                            window.location.href.replace(/.*#/, ''),
                            '/pay/chart'
                          )}
                          activeColor='blue'
                        />
                      </SLink>
                    </Div>
                    <Button
                      ml='auto'
                      icon='sync alternate'
                      content='Точка Банк'
                      onClick={() => syncWithTochkaPayments()}
                      loading={loading}
                    />
                  </Header>
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
                            payment={activePayment}
                            reset={() => setActivePayment(null)}
                            articles={articles}
                            orgs={orgs}
                            equipment={equipment}
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

