import React, { useState } from 'react'
import { useMutation, useQuery } from '../hooks/apolloHooks'
import { personExecs } from '../../graphql/person'
import { orgsAndPersonsExecs } from '../../graphql/exec'
import { upsertPerson2 as uP } from '../../graphql/person'

import styled from 'styled-components'
import { Div, Button, Icon } from '../styled/styled-semantic'
import { Menu } from '../Details/Menu/Menu'
import LeftIcon from '../Details/Menu/LeftIcon'
import { Dimmer, Loader } from 'semantic-ui-react'
import produce from 'immer'
import { assignNested, getStructure } from '../form/utils'
import { syncWithAmoContacts as sWAC } from '../../graphql/amo'

const ListTitle = styled.h4`
	margin: 0;
	padding: 1em 1em 1em 55px;
	display: flex;
`

const ListItemContainer = styled.div`
  display: flex;
	cursor: pointer;
	border-width: 1px 0;
	border-style: solid;
	border-color: white;
  :hover {
    background: rgb(250, 250, 250);
    color: rgba(0,0,0,.95);
  }
  ${props => props.active && `
		background: rgba(0,0,0,.05);
		font-weight: bold;
		border-color: rgba(34, 36, 38, 0.15);
	`}
`

const ListItem = ({
  active,
	text,
	onClick,
}) => <ListItemContainer
		active={active}
		onClick={onClick}
	>
  <LeftIcon
    name={active ? 'check square outline' : 'square outline'}
  />
  <Div>
		{text}
  </Div>
</ListItemContainer>

export default function SelectExecDetails ({
  details: {
		opTypeId,
		onSubmit
	},
  setDetails,
}) {
  const { data, loading } = useQuery(orgsAndPersonsExecs)
	const [ execId, setExecId ] = useState('')
	const [ personId, setPersonId ] = useState('')
	const [ search, setSearch ] = useState('')
	const orgs = data && data.orgs && data.orgs
		.filter(o => !search || o.name.indexOf(search) !== -1) || []
	const persons = data && data.persons && data.persons
		.filter(p => !search || p.amoName.indexOf(search) !== -1) || []
	const [ syncWithAmoContacts, { loading: syncingContacts } ] = useMutation(sWAC, {
		successMsg: 'Контакты синхронизированы',
		errMsg: 'Ошибка синхронизации с Амо'
	})
	const [ upsertPersonProto ] = useMutation(uP, {
		successMsg: 'Обновлены данные исполнителя',
		errMsg: 'Ошибка. Данные исполнителя не обновлены'
	})
	const upsertPerson = () => upsertPersonProto({ variables: { input:
		produce(getStructure(persons.find(p => p.id === personId)), draft => {
			assignNested(draft, `exec.opTypes[length]`, { opTypeId } )
		})
	}})
  return <>
    <Menu
      setDetails={setDetails}
      title='Выбор исполнителя'
      onSubmit={async () => {
				if (personId) {
					const { data } = await upsertPerson()
					const execId = data && data.upsertPerson2.exec.id
					if (execId) onSubmit(execId)
				}
				if (execId) onSubmit(execId)
				setDetails(null)
			}}
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
			{loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> : <>
				<ListTitle>Для выбранной операции</ListTitle>
				{persons
					.filter(p => p.exec && p.exec.opTypes.findIndex(ot => ot.id === opTypeId) !== -1)
					.map(p => <ListItem
						key={p.id}
						active={p.exec.id === execId}
						text={p.amoName}
						onClick={() => setExecId(p.exec.id) || setPersonId('')}
					/>)
				}
				<ListTitle>Остальные исполнители</ListTitle>
				{persons
					.filter(p => p.exec && p.exec.opTypes.findIndex(ot => ot.id === opTypeId) === -1)
					.map(p => <ListItem
						key={p.id}
						active={p.exec.id === execId}
						text={p.amoName}
						onClick={() => setPersonId(p.id) || setExecId('')}
					/>)
				}
				<ListTitle>Все контакты
					<Button compact circular menu
						w='180px'
						ml='auto'
						ta='left'
						activeColor='blue' 
						onClick={syncWithAmoContacts}
					>
						<Icon
							name='refresh'
							color={syncingContacts ? 'blue' : undefined} 
							loading={syncingContacts}
						/>
						{syncingContacts ? 'Загрузка..' : 'Контакты AmoCRM'}
					</Button>
				</ListTitle>
				{persons
					.filter(p => !p.exec)
					.map(p => <ListItem
						key={p.id}
						active={p.id === personId}
						text={p.amoName}
						onClick={() => setPersonId(p.id) || setExecId('')}
					/>)
				}
				<ListTitle>Все компании</ListTitle>

			</>}
		</Div>
  </>
}