import React, { useContext } from 'react'
import { useMutation } from '../../hooks/apolloHooks'
import { createPostEnvelopeAddressInsert as cPEAI } from '../../../graphql/org'
import DiskContext from '../../context/DiskContext'

import styled from 'styled-components'
import { Div } from '../../styled/styled-semantic'
import { Dropdown } from 'semantic-ui-react'
import { DropdownMenu } from './DropdownMenu'

const Container = styled.div`
  display: flex;
`

const Title = styled(Div)`
  ${Container}:hover & {
    width: '80px';
    font-weight: bold;
  }
`

const Menu = styled(Div)`
  display: none;
  margin-left: auto;
  ${Container}:hover & {
    display: unset;
  }
`

export default React.memo(function Org ({
  dealId,
  org: { id: orgId, name, inn },
  setDetails
}) {
  const { highlightFolder } = useContext(DiskContext)
  const [ createPostEnvelopeAddressInsert ] = useMutation(cPEAI, {
    variables: { orgId },
    successMsg: 'Почтовое вложение создано',
    errMsg: 'Ошибка создания почтового вложения',
    mark: 'Org createPostEnvelopeAddressInsert'
  })
  return <Container>
    <Title
      ov='hidden'
      to='ellipsis'
      whs='nowrap'
      pos='relative'
      pl='6px'
    >
      {name}
    </Title>
    <Menu>
      <DropdownMenu>
        <Dropdown.Item
          icon='folder'
          text='Обнаружить папку'
          onClick={() => highlightFolder({ orgId })}
        />
        <Dropdown.Item
          icon='newspaper outline'
          text='Реквизиты'
          onClick={() => setDetails({ orgId, type: 'Org' })}
        />
        <Dropdown.Item
          icon='file alternate'
          text='Создать КП'
          onClick={() => setDetails({ dealId, type: 'CreateComOffer' })}
        />
        <Dropdown.Item
          icon='file alternate outline'
          text='Создать договор'
          onClick={() => setDetails({ orgId, type: 'Org', section: 'contract' })}
          disabled={!inn}
        />
        <Dropdown.Item
          icon='mail'
          text='Создать почтовое вложение'
          onClick={() => createPostEnvelopeAddressInsert()}
        />
      </DropdownMenu>
    </Menu>
  </Container>
})
