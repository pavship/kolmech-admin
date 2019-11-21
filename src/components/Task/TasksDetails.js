import React, { useState, useContext } from 'react'
import groupBy from 'lodash/groupBy'
import { toLocalDatetimeString } from '../../utils/dates'
import { useQuery, useMutation } from '../hooks/apolloHooks'
import {
  tasksDetails,
  upsertTask as uT
} from '../../graphql/task'
import UserContext from '../context/UserContext'

import styled from 'styled-components'
import { Div } from '../styled/styled-semantic'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Menu } from '../Details/Menu/Menu'
import { useApolloClient } from '@apollo/react-hooks'
import { TaskListItem } from './TaskListItem'
import cuid from 'cuid'
import { NewTask } from './NewTask';

const ListTitle = styled.h4`
	margin: 0;
	padding: 1em 1em 1em 55px;
	display: flex;
`

export default function TasksDetails ({
  details: { appoint, upsertAnyAppoint, upsertAppoint },
  setDetails
}) {
  const { exec: { id: execId } } = appoint
	
  const { me: { person: {exec: { id: userExecId } }}} = useContext(UserContext)
  const { data } = useQuery(tasksDetails)
  const tasksByExec = !(data && data.tasks)
    ? {}
    : (() => {
        const grouped = groupBy(data.tasks, 'appoint.exec.id')
        grouped[execId] = grouped[execId] || []
        grouped[execId].push({
          isNew: true,
          appoint,
        })
        return grouped
      })()
  console.log('tasksByExec > ', tasksByExec)
  const execIds = Object.keys(tasksByExec)
  return <>
    <Menu
      setDetails={setDetails}
      title='Задачи'
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
      {!execIds.length ? <Dimmer active ><Loader>Загрузка..</Loader></Dimmer> : <>
        <ListTitle>Мои задачи</ListTitle>

        {execIds
          .filter(execId => execId !== userExecId)
          .map(execId => {
            const tasks = tasksByExec[execId]
            console.log('tasks > ', tasks)
            console.log('tasks[0].appoint.exec.person.amoName > ', tasks[0].appoint.exec.person.amoName)
            return <div
              key={execId}
            > 
              <ListTitle>{tasks[0].appoint.exec.person.amoName}</ListTitle>
              {tasks.map(task => task.isNew
                ? <NewTask
                    key={cuid()}
                    task={task}
                    upsertAppoint={upsertAppoint}
                  />
                : <TaskListItem
                    key={task.id}
                    task={task}
                    upsertAppoint={(draftHandler, options) =>
                      upsertAnyAppoint({
                        ...task.appoint,
                        tasks
                      }, draftHandler, options)}
                    // active={p.exec.id === execId}
                    // onClick={() => setPersonId(p.id) || setExecId('')}
                  />
              )}
            </div>
          }
        )}
      </>}
		</Div>
  </>
}