import React, { useState, useEffect, useRef } from 'react'
import { Icon, Dropdown } from 'semantic-ui-react'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import HtmlInput from '../../common/HtmlInput'
import { assignNested } from '../../form/utils'
import { DropdownMenu } from './DropdownMenu';

const Container = styled(Div)`
  display: flex;
`

const Title = styled.div`
  position: relative;
  /* width: 100%; */
  text-overflow: ellipsis;
  white-space: nowrap;
  /* ${Container}:hover & {
    ${props => !props.isNew && 'width: 140px;'}
    ${props => !props.isNew && props.isMachiningClass && 'width: 140px;'}
  } */
`

const Menu = styled.div`
  display: none;
  margin-left: auto;
  ${Container}:hover & {
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

export default function Proc ({
  modelId,
  proc,
  upsertBatch,
  deleteElement
}) {
  const { isNew: isNewProc, name} = proc
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode &&
    inputRef.current &&
    inputRef.current.focus()) || undefined)
  if (editMode)
    return <HtmlInput
      ref={inputRef}
      placeholder='Новый техпроцесс'
      value={name || ''}
      onChange={value => {
        upsertBatch(draft => {
          assignNested(draft, 'procs[0]', { name: value, modelId })
        })
      }}
      onBlur={() => setEditMode(false)}
    />
  else if (isNewProc)
    return <Icon
      link
      name='plus'
      onClick={() => setEditMode(true)}
    />
  else
    return <Container
      w='170px'
    >
      <Title>
        {name}
      </Title>
      <Menu>
        <DropdownMenu>
          <WarningItem
            icon='trash'
            text='Удалить'
            onClick={deleteElement}
          />
        </DropdownMenu>
      </Menu>
    </Container>
}