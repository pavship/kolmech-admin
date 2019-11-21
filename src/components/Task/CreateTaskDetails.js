import React, { useState } from 'react'
import { useMutation } from '../hooks/apolloHooks'
import { upsertTask as uT } from '../../graphql/task'

import { Menu } from '../Details/Menu/Menu'
import { toLocalDatetimeString } from '../../utils/dates'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import BatchDetails from '../Batch/Details'

export default function CreateTaskDetails ({
  details: { appointId },
  setDetails
}) {
	const [ from, setFrom ] = useState(toLocalDatetimeString(new Date()))
	const [ text, setText ] = useState()
	const [ upsertTask ] = useMutation(uT, {
		variables: { input: {
			from: new Date(from).toISOString(),
			text,
			status: 'ACTIVE',
			appointId
		}}
	})
  return <>
    <Menu
      setDetails={setDetails}
      title='Добавить задачу'
      onSubmit={() => console.log('{ from, text, status: ACTIV, appointId } > ', { from, text, status: 'ACTIVE', appointId }) && upsertTask()}
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
			<Div
				p='1em 1em 1em 55px'
			>
        {/* <Field
					label='Кому'
					type='select'
					value={date}
					onChange={date => setDate(date)}
				/> */}
				<Field
					label='Дата и время'
					type='datetime-local'
					value={from}
					onChange={date => setFrom(date)}
				/>
				<Field
					label='Задача'
					inputWidth='257px'
					type='textarea'
					value={text}
					onChange={text => setText(text)}
				/>
			</Div>
			{/* <BatchDetails
				dealId={dealId}
			/> */}
		</Div>
  </>
}