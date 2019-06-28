import React, { useState, useRef, useEffect, useContext } from 'react'
import DiskContext from '../../context/DiskContext'

import { Dropdown } from 'semantic-ui-react'
import { Div } from '../../styled/styled-semantic'
import { DropdownMenu } from './DropdownMenu'

export default function Org ({
  deal,
  orgs,
  upsertDeal,
  upsertingDeal,
  setDetails
}) {
  const { id: dealId, org } = deal
  const orgId = (org && org.id) || 0
  const { highlightFolder } = useContext(DiskContext)
  const inputRef = useRef(null)
  const [ editMode, setEditMode ] = useState(false)
  useEffect(() => (editMode && inputRef.current &&
    inputRef.current.toggle()) || undefined)
  const [isHovered, setIsHovered] = useState(false)
  const options = orgs
    .map(o => ({key:o.id, value: o.id, text: o.name}))
  if (editMode)
    return <Dropdown
      ref={inputRef}
      disabled={upsertingDeal}
      loading={upsertingDeal}
      options={options}
      value={orgId}
      onBlur={() => setEditMode(false)}
      onChange={async (e, { value: orgId }) => {
          await upsertDeal({ variables: { input: {
            id: dealId,
            orgId
          }}})
        setEditMode(false)
      }}
      search
      selection //required when allowAdditions
      selectOnBlur={false}
      selectOnNavigation={false}
      noResultsMessage='Если не найдено, добавьте организацию на странице Платежи'
    />
  else if (orgId === 0)
    return null
    // return <Icon
    //   link
    //   name='plus'
    //   onClick={() => setEditMode(true)}
    // />
  else
    return <Div
      d='flex'
      onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
    >
      <Div
        ov='hidden'
        to='ellipsis'
        w={isHovered ? '140px' : undefined}
        fw={isHovered ? 'bold' : undefined}
        pl='6px'
        // onClick={() => setEditMode(true)} //block editing
      >
        {org && org.name}
      </Div>
      {isHovered &&
        <DropdownMenu>
          <Dropdown.Item
            icon='folder'
            text='Обнаружить папку'
            onClick={() => highlightFolder({ orgId })}
          />
          <Dropdown.Item
            icon='newspaper outline'
            text='Реквизиты'
            onClick={() => setDetails({ id: orgId, type: 'Org' })}
          />
          <Dropdown.Item
            icon='file alternate'
            text='Создать КП'
            onClick={() => setDetails({ dealId, type: 'CreateComOffer' })}
          />
          <Dropdown.Item
            icon='file alternate outline'
            text='Создать договор'
            onClick={() => setDetails({ id: orgId, type: 'Org', section: 'contract' })}
            disabled={!org.inn}
          />
        </DropdownMenu>
      }
    </Div>
}
