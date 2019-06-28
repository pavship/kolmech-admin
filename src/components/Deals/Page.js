import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { dealsPage, upsertDeal } from '../../graphql/deal'
import { NotificationsConsumer } from '../notifications/NotificationsContext'
import { DealsContextProvider } from './context/Context'
import { DetailsProvider } from '../Details/Provider'

import DealsTable from './Table'
import Menu from './Menu'
import { Dimmer, Loader } from 'semantic-ui-react'

export default ({
  refreshToken
}) => {
  return (
    <NotificationsConsumer>
      {({ notify }) =>
        <Mutation
          mutation={upsertDeal}
          onCompleted={res => {
            // console.log('res > ', res)
            notify({
              type: 'success',
              title: 'Информация сохранена'
            })
          }}
          onError={err => notify({
            type: 'error',
            title: 'Ошибка сохранения сделки',
            content: err.message,
          })}
        >
          {(upsertDeal, { loading: upsertingDeal }) => 
            <Query
              query={dealsPage}
              onError={err => notify({
                type: 'error',
                title: 'Ошибка загрузки сделок',
                content: err.message,
              })}
            >
              {({ loading,
                  error,
                  data,
                  refetch
                }) => <>
                  <Menu
                    notify={notify}
                    title='Сделки'
                    titleLinkTo='/deals'
                    refreshToken={refreshToken}
                    refetchDeals={refetch}
                  />
                  <DetailsProvider>
                      {!loading
                        ? !error
                          ? data && 
                            <DealsContextProvider
                              opTypes={data.opTypes}
                            >
                              <DealsTable
                                notify={notify}
                                deals={data.deals}
                                orgs={data.orgs}
                                upsertDeal={upsertDeal}
                                upsertingDeal={upsertingDeal}
                              />
                            </DealsContextProvider>
                          : `Ошибка ${error.message}`
                        : <Dimmer
                            active
                          >
                            <Loader>
                              Загрузка..
                            </Loader>
                          </Dimmer>
                      }
                  </DetailsProvider>
                </>
              }
            </Query>
          }
        </Mutation>
      }
    </NotificationsConsumer>
  )
}

