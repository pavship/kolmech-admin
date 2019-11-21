import React from 'react'
import { Menu } from '../../Details/Menu/Menu'
import { Query } from 'react-apollo'
import { orgLocal, orgDetails } from '../../../graphql/org'
import { useNotifications } from '../../notifications/NotificationsContext'
import InnForm from './InnForm'
import Requisites from './Requisites'
import Contract from './Contract'

export default function OrgDetails ({
  details: {
		orgId: id,
		section
  },
  setDetails
}) {
  const { notify } = useNotifications()
  return <>
    <Query
      query={orgLocal}
      variables={{ id }}
    >
      {({ data: { orgLocal } }) => orgLocal
        ? <>
            <Menu
              setDetails={setDetails}
              title={orgLocal.name}
              subtitle={orgLocal.inn && `ИНН: ${orgLocal.inn}`}
            />
            {orgLocal.inn
              ? <Query
                  query={orgDetails}
                  variables={{ id }}
                  onError={err => notify({
                    type: 'error',
                    title: 'Ошибка загрузки реквизитов организации',
                    content: err.message,
                  })}
                >
                  {({ data: { orgDetails }, loading }) =>
                    loading ? 'Загрузка..' :
                    orgDetails
                      ?	<>
                          <Requisites
                            org={orgDetails}
                          />
                          <Contract
                            notify={notify}
                            org={orgDetails}
                            initiallyExpanded={section === 'contract'}
                          />
                        </>
                      : null
                  }
                </Query>
              : <InnForm
                  notify={notify}
                  id={id}
                />
            }
          </>
        : null
      }

    </Query>
  </>
}