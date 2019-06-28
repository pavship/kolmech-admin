import React, { useState, useContext } from 'react'

import { Dropdown } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'

import DiskContext from '../../context/DiskContext'
import { DropdownMenu } from './DropdownMenu'

export default ({
  deal
}) => {
  const { id: dealId, amoId } = deal
  const { highlightFolder } = useContext(DiskContext)
  const [isHovered, setIsHovered] = useState(false)
  return <Div
    d='flex'
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <Div
      ov='hidden'
      to='ellipsis'
      w={isHovered ? '150px' : undefined}
      fw={isHovered ? 'bold' : undefined}
    >
      {deal && deal.name}
    </Div>
    {isHovered &&
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
    }
  </Div>
}
