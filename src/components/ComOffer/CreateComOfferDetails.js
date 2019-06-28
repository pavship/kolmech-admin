import React, { useState } from 'react'
import { Menu } from '../Details/Menu/Menu'
import { useMutation } from '../hooks/apolloHooks'
import { createComOffer as cCO } from '../../graphql/deal'
import { toLocalDateString } from '../../utils/dates'
import { Div } from '../styled/styled-semantic'
import Field from '../form/Field'
import DealDetails from '../Deals/Details/Details'

export default function CreateComOfferDetails ({
  details: { dealId },
  setDetails
}) {
	const [ date, setDate ] = useState(toLocalDateString(new Date()))
  const [ createComOffer ] = useMutation(cCO, { variables: { dealId, date } })
  return <>
    <Menu
      setDetails={setDetails}
      title='Создать КП'
      onSubmit={() => createComOffer()}
    />
    <Div
			h='calc(100% - 47px)'
			oy='scroll'
		>
			<Div
				p='1em 1em 1em 55px'
			>
				<Field
					label='Дата'
					type='date'
					value={date}
					onChange={date => setDate(date)}
				/>
			</Div>
			<DealDetails
				dealId={dealId}
			/>
		</Div>
  </>
}