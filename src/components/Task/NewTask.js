import React, { useState } from 'react'
import {
  upsertTask as uT
} from '../../graphql/task'
import styled from 'styled-components'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import LeftIcon from '../Details/Menu/LeftIcon';
import { Icon } from 'semantic-ui-react'
import { useMutation } from '../hooks/apolloHooks'
import { assignNested } from '../form/utils'
import { toLocalDatetimeString } from '../../utils/dates'
import { useApolloClient } from '@apollo/react-hooks'

const Container = styled.div`
  display: flex;
  align-items: baseline;
  padding: 1em 1em 1em 0;
  border-top: 1px solid #2185d0;
  border-bottom: 1px solid #2185d0;
`

export function NewTask ({
  task,
  upsertAppoint
}) {
  const [ from, setFrom ] = useState(toLocalDatetimeString(new Date()))
  const [ text, setText ] = useState()
  const client = useApolloClient()
  // const [ upsertTask ] = useMutation(uT, {
	// 	variables: { input: {
	// 		from: new Date(from).toISOString(),
	// 		text,
  //     status: 'ACTIVE',
  //     order: newTaskOrder,
	// 		appointId
	// 	}}
  // })
  return <Container>
    <LeftIcon
      size='big'
      name='plus'
      color='blue'
      disabled={!text}
      onClick={() => upsertAppoint(draft => {
        assignNested(draft, `tasks[length]`, {
          from: new Date(from).toISOString(),
          text,
          status: 'ACTIVE',
          order: draft.tasks && draft.tasks.length || 0,
        })
      }, {
        onCompleted({ appoint }) {
          console.log('appoint > ', appoint)
        }
      })}
    />
    <Field
      label='Новая задача'
      inputWidth='257px'
      type='textarea'
      value={text}
      onChange={text => setText(text)}
      debouncedWrite
    />
    {/* <Field
      label='Дедлайн'
      type='datetime-local'
      value={from}
      onChange={date => setFrom(date)}
    /> */}
  </Container>
}