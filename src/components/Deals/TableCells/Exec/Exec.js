import React, { useState, useContext } from 'react'

import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from './Name'
import { assignNested } from '../../../form/utils'
import { personExec } from '../../../../graphql/person'
import DetailsContext from '../../../Details/Provider'

const ExecContainer = styled.div`
  display: flex;
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
  background: rgba(0,0,0,.05);
`

const WarningItem = styled(Dropdown.Item)`
  :hover {
    color: #9f3a38 !important;
    .icon {
      color: #9f3a38 !important;
    }
  }
`

export const Exec = ({
  basePath,
  exec,
  execIndex,
  op,
  opIndex,
  upsertBatch,
}) => {
  const { opType: { id: opTypeId } } = op
  const { id: execId, isNew, person } = exec
  const { setDetails } = useContext(DetailsContext)
  const [isHovered, setIsHovered] = useState(false)
  return <ExecContainer>
    <Div
      d='flex'
      w='170px'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Div
        w={isHovered ? '140px' : '100%'}
      >
        <ExecName
          basePath={basePath}
          exec={exec}
          opIndex={opIndex}
          opTypeId={opTypeId}
          upsertBatch={upsertBatch}
        />
      </Div>
      {!isNew && isHovered &&
        <DropdownMenu>
          <WarningItem
            icon='remove'
            text='Открепить'
            onClick={() => upsertBatch(draft => {
              assignNested(draft, basePath + `ops[${opIndex}].execs[${execIndex}].disconnect`, true)
            }, { refetchQueries: [{ query: personExec, variables: { id: person.id } }] })}
          />
          <Dropdown.Item
            icon='plus'
            text='Задача'
            onClick={() => setDetails({ op, execId, type: 'createTask' })}
          />
        </DropdownMenu>
      }
    </Div>
  </ExecContainer>
}