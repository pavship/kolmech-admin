import React, { useState, useContext } from 'react'
import produce from 'immer'

import { Query, Mutation } from 'react-apollo'
import { useQuery } from '../hooks/apolloHooks'
import { accounts as accountsQuery } from '../../graphql/account'
import { paymentsPage } from '../../graphql/payment'
import UserContext from '../context/UserContext'

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
  min-height: ${368 + 47.5*2}px;
  display: flex;
  border-bottom: 1px solid gray;
`

const BottomSection = styled.div`
  /* flex: 1 1 2000px;
  margin-top: 1rem; */
  overflow-y: scroll;
`

export default ({
}) => {
  const { me: { role, account: defaultAccount, accounts: accountsAvailable }} = useContext(UserContext)
  const { loading: accountsLoading, error: accountsError, data: { accounts }, refetch: refetchAccounts, client } = useQuery(accountsQuery)
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
                // accounts,
                mdKontragents,
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
                  >
                    {role === 'OWNER' &&<>
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
                    </>}
                  </Menu>
                }
              </Mutation>
              <Container>
                { paymentsLoading || accountsLoading ? 'Загрузка...' :
                  error || accountsError ? `Ошибка ${error.message}` : <>
                    <TopSection>
                      <Route
                        exact
                        path="/pay"
                        render={() => (<>
                          <PaymentForm
                            accounts={role === 'OWNER' 
                              ? accounts
                              : [
                                defaultAccount,
                                ...accountsAvailable
                              ]
                            }
                            accountsQuery={accountsQuery}
                            articles={articles}
                            client={client}
                            defaultAccountId={defaultAccount.id}
                            mdKontragents={mdKontragents}
                            mpProjects={mpProjects}
                            orgs={orgs}
                            payment={activePayment}
                            refetchAccounts={refetchAccounts}
                            reset={() => setActivePayment(null)}
                          />
                          <PaymentStats
                            accounts={role === 'OWNER' 
                              ? accounts
                              : [ defaultAccount ]
                            }
                            orgs={orgs}
                            payments={payments}
                            userRole={role}
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
                        accounts={accounts}
                        activePayment={activePayment}
                        mdKontragents={mdKontragents}
                        mpProjects={mpProjects}
                        onClickEdit={id => setActivePayment(payments.find(p => p.id === id))}
                        onClickCopy={id => setActivePayment(produce(payments.find(p => p.id === id), draft => {
                          delete draft.id
                          delete draft.dateLocal
                        }))}
                        payments={payments}
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

