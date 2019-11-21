import React, { useState, useContext } from 'react'
import { useMutation } from '../../../hooks/apolloHooks'
import { upsertAppoint as uAq } from '../../../../graphql/appoint'
import { getStructure, assignNested } from '../../../form/utils'
import produce from 'immer'

import DetailsContext from '../../../Details/Provider'
import styled from 'styled-components'
import { Div, Icon } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from '../Exec/Name'
import Task from '../../Task/Task'
import BpStat from '../BpStat/BpStat'

const Container = styled.div`
  position: relative;
  width: 100%;
  :not(:last-child) {
    border-bottom: 1px solid rgba(34,36,38,0.15);
  }
`

const TitleContainer = styled.div`
  display: flex;
  width: 170px;
`

const HeaderContainer = styled.div`
  display: flex;
`

const Title = styled(Div)`
  width: 100%;
  ${TitleContainer}:hover & {
    width: 139px;
  }
`

const Menu = styled.div`
  display: none;
  margin-left: auto;
  ${TitleContainer}:hover & {
    display: unset;
  }
`

const WarningItem = styled(Dropdown.Item)`
  :hover {
    color: #9f3a38 !important;
    .icon {
      color: #9f3a38 !important;
    }
  }
`

export default function Appoint ({
  basePath,
  appoint,
  op,
  opIndex,
  upsertBatch,
  budgetMode
}) {
  // console.log('Appoint > ')
  const { opType } = op
  const { id: appointId, isNew, tasks, bpStat } = appoint
  const { setDetails } = useContext(DetailsContext)
  const [ upsertAppointProto ] = useMutation(uAq)
  const upsertAnyAppoint = (appoint, draftHandler, options = {}) => console.log('options > ', options) ||
    upsertAppointProto({ variables: { input:
      produce(getStructure(appoint), draftHandler)
    }, options})
  const upsertAppoint = (draftHandler, options) =>
    upsertAnyAppoint(appoint, draftHandler, options)
  return <>
    <Container>
      <HeaderContainer>
        <TitleContainer>
          <Title
            whs='nowrap'
            to='ellipsis'
            pos='relative'
          >
            <ExecName
              basePath={basePath}
              appoint={appoint}
              opIndex={opIndex}
              opType={opType}
              upsertBatch={upsertBatch}
            />
          </Title>
              {!isNew &&
            <Menu>
              <DropdownMenu>
                <WarningItem
                  icon='remove'
                  text='Открепить'
                  onClick={() => upsertBatch(draft => {
                    assignNested(draft, `${basePath}appoints[id=${appointId}]`, {})
                  })}
                />
                <Dropdown.Item
                  icon='plus'
                  text='Задача'
                  onClick={() => setDetails({ appoint, upsertAppoint, upsertAnyAppoint, type: 'tasks' })}
                />
              </DropdownMenu>
            </Menu>
          }
        </TitleContainer>
        {!isNew &&
          <BpStat
            bpStat={bpStat}
            budgetMode={budgetMode}
            upsertParent={upsertAppoint}
          />
        }
      </HeaderContainer>
      {tasks && tasks.map(task =>
        <Task
          key={task.id}
          task={task}
          upsertAppoint={upsertAppoint}
        />
      )}
      {/* <Div
        pos='absolute'
        l='170px'
        w='2000px'
        h='100%'
        pe='none'
      >
        {tasks && tasks.map(task =>
          <Task
            key={task.id}
            task={task}
          />
        )}
      </Div> */}
    </Container>
    {/* <Div></Div> */}
  </>
}