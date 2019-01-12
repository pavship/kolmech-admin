import React from 'react'
import produce from 'immer'
import { Query } from 'react-apollo'
import { orgEmployees } from '../graphql/employee'

import styled from 'styled-components'

import { Message } from './styled/styled-semantic';
import GlobalContext from './special/GlobalContext'
import EmployeesPanelHeader from './Employee/PanelHeader'
import EmployeeDetails from './Employee/Details'
import EmployeeEdit from './Employee/Edit'
import EmployeesTable from './Employee/Table';

const EmployeesPanelBody = styled.div`
  display: flex;
  height: calc(100% - 37px);
`

const EmployeesPanelTableSection = styled.div`
  flex: 0 0 600px;
`

const EmployeeDetailsSection = styled.div`
  flex: 0 0 480px;
  border: solid rgb(156,156,159);
  border-width: 0 1px;
  min-height: 100%;
`

const processEmp = emp =>
  produce(emp, draft => {
    const { lName, fName, mName } = draft.person
    draft.person.fullname = [lName, fName, mName].join(' ')
  })

export default ({
  closePanel
}) => {
  return (
    <GlobalContext>
      {({ bottomPanel, setBottomPanel }) => <>
        <EmployeesPanelHeader 
          closePanel={closePanel}
        />
        <Query
          query={orgEmployees}
          variables={{ orgId: bottomPanel.orgId }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) return 'Загрузка..'
            if (error) return `Ошибка ${error.message}`
            const emps = data.orgEmployees
            const activeEmp = bottomPanel.id && data.orgEmployees.find(e => e.id === bottomPanel.id)
            return (
              <EmployeesPanelBody>
                <EmployeesPanelTableSection>
                  {emps.length
                    ? <EmployeesTable
                        emps={emps}
                      />
                    : <Message
                        m='1em'
                        content={<>
                          Добавьте первого представителя<br/>
                          👉
                        </>}
                      />
                  }
                </EmployeesPanelTableSection>
                <EmployeeDetailsSection>
                  {!bottomPanel.id
                    ? <EmployeeEdit 
                        orgId={bottomPanel.orgId}
                        refetchQueries={refetch}
                      /> :
                    !activeEmp.person ?
                      null :
                    bottomPanel.editMode
                    ? <EmployeeEdit
                        emp={activeEmp}
                        orgId={bottomPanel.orgId}
                        toggleEditMode={() => setBottomPanel(
                          produce(bottomPanel, draft => { delete draft.editMode })
                        )}
                        refetchQueries={refetch}
                      />
                    : <EmployeeDetails
                        emp={processEmp(activeEmp)}
                        toggleEditMode={() => setBottomPanel({ ...bottomPanel, editMode: true })}
                      />
                  }
                </EmployeeDetailsSection>
              </EmployeesPanelBody>
            )
          }}
        </Query>
      </>}
    </GlobalContext>
  )
}
