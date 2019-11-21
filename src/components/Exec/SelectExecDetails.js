import React, { useState, useRef, useEffect } from 'react'
import partition from 'lodash/partition'
import { useQuery, useMutation } from '../hooks/apolloHooks'
import { orgsAndPersonsExecs } from '../../graphql/exec'
import { upsertPerson2 as uP } from '../../graphql/person'

import styled from 'styled-components'
import { Div, Button, Icon } from '../styled/styled-semantic'
import { Menu } from '../Details/Menu/Menu'
import LeftIcon from '../Details/Menu/LeftIcon'
import { Dimmer, Loader, Input, Header } from 'semantic-ui-react'
import produce from 'immer'
import { assignNested, getStructure } from '../form/utils'
import { syncWithAmoContacts as sWAC } from '../../graphql/amo'
import useUpsert, { useSpecUpsert } from '../hooks/useUpsert';

const FiltersContainer = styled.div`
	padding: 1em 1em 1em 55px;
	border-bottom: 1px solid rgba(34, 36, 38, 0.15);
	box-shadow: 0 20px 20px 0 #fff;
`

const Lists = styled.div`
	height: calc(100% - 47px - 67px);
	overflow-y: scroll;
`

const ListTitle = styled.h4`
	margin: 0;
	padding: 1em 1em 1em 55px;
	/* :first-child {
		padding-top: 0;
	} */
	display: flex;
`

const ListSubTitle = styled(Header)` &&& {
	margin: 0 0 1em;
	padding: 0 55px;
}`

const ListItemContainer = styled.div`
  display: flex;
	padding-right: 1em;
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

const ListItemControl = styled(Icon)`
	&&& {
		opacity: 0;
		transition: opacity .25s ease;
		${ListItemContainer}:hover & {
			opacity: .45;
		}
	}
`

const ListItem = ({
  active,
	text,
	onClick,
	onRemove
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
	{onRemove &&
		<ListItemControl
			link
			name='close'
			ml='auto'
			color='grey'
			activeColor='red'
			onClick={e => e.stopPropagation() || onRemove()}
		/>
	}
</ListItemContainer>

export default function SelectExecDetails ({
  details: {
		opTypeId,
		onSubmit
	},
  setDetails,
}) {
	const searchInput = useRef(null)
  const { data, loading, error } = useQuery(orgsAndPersonsExecs)
	const [ execId, setExecId ] = useState('')
	const [ person, setPerson ] = useState(null)
	const [ org, setOrg ] = useState('')
	const [ search, setSearch ] = useState('')
	const orgs = data && data.orgs && data.orgs
		.filter(o => !search || o.name.toLowerCase().indexOf(search.toLowerCase()) !== -1) || []
	const persons = data && data.persons && data.persons
		.filter(p => !search || p.amoName.toLowerCase().indexOf(search.toLowerCase()) !== -1) || []
	const [ syncWithAmoContacts, { loading: syncingContacts } ] = useMutation(sWAC, {
		successMsg: 'Контакты синхронизированы',
		errMsg: 'Ошибка синхронизации с Амо',
		mark: 'syncWithAmoContacts'
	})
	const [ upsertSpecPerson ] = useSpecUpsert('personExec', {
		successMsg: 'Обновлены данные исполнителя',
		errMsg: 'Ошибка. Данные исполнителя не обновлены',
	})
	const [ upsertSpecOrg ] = useSpecUpsert('orgExec', {
		successMsg: 'Обновлены данные исполнителя',
		errMsg: 'Ошибка. Данные исполнителя не обновлены',
	})
	// const upsertSpecPerson = () => {}
	const [ suitablePersons, otherPersons ] = partition(persons,
		({ exec }) => exec && exec.opTypes.findIndex(ot => ot.id === opTypeId) > -1
	)
	const [ suitableOrgs, otherOrgs ] = partition(orgs,
		({ exec }) => exec && exec.opTypes.findIndex(ot => ot.id === opTypeId) > -1
	)
	useEffect(() => searchInput.current.focus())
  return <>
    <Menu
      setDetails={setDetails}
      title='Выбор исполнителя'
      onSubmit={async () => {
				if (person) {
					const { data } = await upsertSpecPerson(person,
						[ `exec.opTypes[length]`, { opTypeId } ]
					)
					const execId = data && data.upsertPerson2.exec.id
					if (execId) onSubmit(execId)
				}
				if (org) {
					const { data } = await upsertSpecOrg(org,
						[ `exec.opTypes[length]`, { opTypeId } ]
					)
					console.log('data > ', data)
					const execId = data && data.upsertOrg.exec.id
					if (execId) onSubmit(execId)
				}
				if (execId) onSubmit(execId)
				setDetails(null)
			}}
    />
		<FiltersContainer>
			<Input
				ref={searchInput}
				fluid
				icon='search'
				placeholder='Искать..'
				value={search}
				onChange={(e, { value }) => setSearch(value)}
			/>
		</FiltersContainer>
    <Lists>
			{!error && loading ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> : <>
				<ListTitle>Для выбранной категории</ListTitle>
				{suitablePersons.length > 0 && <ListSubTitle sub > Контакты </ListSubTitle> }
				{suitablePersons
					.map(p => <ListItem
						key={p.id}
						active={p.exec.id === execId}
						text={p.amoName}
						onClick={() => setExecId(p.exec.id) || setPerson(null) || setOrg(null)}
						onRemove={() => upsertSpecPerson(p,
							[ `exec.opTypes[id=${opTypeId}]`, { disconnect: true } ]
						)}
					/>)
				}
				{suitableOrgs.length > 0 && <ListSubTitle sub > Компании </ListSubTitle> }
				{suitableOrgs
					.map(o => <ListItem
						key={o.id}
						active={o.exec.id === execId}
						text={o.name}
						onClick={() => setExecId(o.exec.id) || setPerson(null) || setOrg(null)}
						onRemove={() => upsertSpecOrg(o,
							[ `exec.opTypes[id=${opTypeId}]`, { disconnect: true } ]
						)}
					/>)
				}
				<ListTitle>Остальные контакты
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
				{otherPersons
					.map(p => <ListItem
						key={p.id}
						active={p === person}
						text={p.amoName}
						onClick={() => setPerson(p) || setOrg(null) || setExecId('')}
					/>)
				}
				<ListTitle>Остальные компании</ListTitle>
				{otherOrgs
					.map(o => <ListItem
						key={o.id}
						active={o === org}
						text={o.name}
						onClick={() => setOrg(o) || setPerson(null) || setExecId('')}
					/>)
				}
			</>}
		</Lists>
  </>
}