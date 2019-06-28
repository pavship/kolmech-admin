import React, { useState } from 'react'
import { Menu } from '../Details/Menu/Menu'
import { useMutation, useQuery } from '../hooks/apolloHooks'
import { upsertTask as uT } from '../../graphql/task'
import { toLocalDatetimeString } from '../../utils/dates'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import BatchDetails from '../Batch/Details'

export default function CreateComOfferDetails ({
  details: { op, execId },
  setDetails
}) {
	const [ from, setFrom ] = useState(toLocalDatetimeString(new Date()))
	const [ text, setText ] = useState()
	const [ upsertTask ] = useMutation(uT, { variables: { input: {
		from,
		text,
		status: 'ACTIVE',
		opId: op.id,
		execId
	}}})
  return <>
    <Menu
      setDetails={setDetails}
      title='Добавить задачу'
      onSubmit={() => console.log('{ from, text, status: ACTIV, opId: op.id, execId } > ', { from, text, status: 'ACTIVE', opId: op.id, execId }) && upsertTask()}
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