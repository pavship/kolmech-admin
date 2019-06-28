import React from 'react'

import styled from 'styled-components'
import { Dropdown } from 'semantic-ui-react'

const MenuButton = styled.div`
  .dropdown {
    width: 30px;
    text-align: center;
  }
  .icon {
    margin: 0;
    color: rgba(50,50,50,.87);
  }
  transition: background .3s ease;
  :hover {
    background: rgba(0,0,0,.12);
    .icon {
      opacity: 1 !important;
    }
  }
`

export const DropdownMenu = ({ children }) => {
  return <MenuButton>
    <Dropdown
      icon={{
        name: 'bars',
        link: true
      }}
      direction='left'
    >
      <Dropdown.Menu>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  </MenuButton>
}

