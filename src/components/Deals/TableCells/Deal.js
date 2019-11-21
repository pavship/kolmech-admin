import React, { useContext } from 'react'
import DiskContext from '../../context/DiskContext'
import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'
import { DropdownMenu } from './DropdownMenu'

const Container = styled.div`
  display: flex;
  position: relative;
  :not(:last-child) {
		border-bottom: 1px solid rgba(34,36,38,0.15);
	}
`

const Title = styled(Div)`
  ${Container}:hover & {
    width: 150px;
  }
`

const Menu = styled.div`
  display: none;
  margin-left: auto;
  ${Container}:hover & {
    display: unset;
  }
`

export default ({
  deal: { id: dealId, amoId, name }
}) => {
  const { highlightFolder } = useContext(DiskContext)
  return <Container>
    <Title
      ov='hidden'
      to='ellipsis'
      fw='bold'
    >
      {name}
    </Title>
    <Menu>
      <DropdownMenu>
        <Dropdown.Header>
          <a
            target="_blank" rel="noopener noreferrer" 
            href={`https://kolomnatutamailcom.amocrm.ru/leads/detail/${amoId}`}
          >AmoCRM</a>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item
          icon='folder'
          text='Обнаружить папку'
          onClick={() => highlightFolder({ dealId })}
        />
      </DropdownMenu>
    </Menu>
  </Container>
}
