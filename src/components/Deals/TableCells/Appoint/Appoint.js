import React, { useState, useContext } from 'react'
import cuid from 'cuid'
import { assignNested } from '../../../form/utils'
import DetailsContext from '../../../Details/Provider'
import styled from 'styled-components'
import { Div } from '../../../styled/styled-semantic'
import { DropdownMenu } from '../DropdownMenu'
import { Dropdown } from 'semantic-ui-react'
import ExecName from '../Exec/Name'

const FlexContainer = styled.div`
  display: flex;
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
  appointIndex,
  op,
  opIndex,
  upsertBatch,
}) {
  const { opType: { id: opTypeId } } = op
  const { id: appointId, isNew, exec } = appoint
  const { setDetails } = useContext(DetailsContext)
  const [isHovered, setIsHovered] = useState(false)
  return <>
    <FlexContainer>
      <Div
        d='flex'
        w='170px'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Div
          w={isHovered ? '140px' : '100%'}
          whs='nowrap'
          to='ellipsis'
          pos='relative'
        >
          <ExecName
            basePath={basePath}
            appoint={appoint}
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
                assignNested(draft, basePath + `ops[${opIndex}].appoints[${appointIndex}]`, {})
              })}
              // }, { refetchQueries: [{ query: personExec, variables: { id: person.id } }] })}
            />
            <Dropdown.Item
              icon='plus'
              text='Задача'
              onClick={() => setDetails({ op, execId: exec.id, type: 'createTask' })}
            />
          </DropdownMenu>
        }
      </Div>
      {/* // {!isNew &&
      //   <Div
      //     w='40px'
      //     bl='1px solid rgba(34,36,38,0.15);'
      //   >
      //     <DealLabour
      //       dealLabor={dealLabor}
      //       opIndex={opIndex}
      //       upsertBatch={upsertBatch}
      //     />
      //   </Div>
      // }
      // {!isNew &&
      //   <Div
      //     w='170px'
      //   >
      //     {[
      //       ...execs,
      //       { id: cuid(), isNew: true }
      //     ].map((exec, i) =>
      //       <Exec
      //         key={exec.id}
      //         basePath={basePath}
      //         exec={exec}
      //         execIndex={i}
      //         op={op}
      //         opIndex={opIndex}
      //         upsertBatch={upsertBatch}
      //       />
      //     )}
      //   </Div>
      // } */}
    </FlexContainer>
  </>
}