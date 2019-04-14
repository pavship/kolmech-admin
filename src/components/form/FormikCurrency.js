import React from 'react'

import NumberFormat from 'react-number-format'

import { Input } from 'semantic-ui-react'
import { Span } from '../styled/styled-semantic'
// import CurrencyInput from './CurrencyInput'

export default ({
	placeholder,
	name,
	value,
	setField
}) => {
	return (
		<>
			<NumberFormat
				customInput={Input}
				// customInput={CurrencyInput}
				placeholder={placeholder}
				value={value}
				decimalSeparator=','
				thousandSeparator=' '
				decimalScale={2}
				allowNegative={false}
				onValueChange={values => setField(name, values.floatValue)} />
			<Span
				pl='6px'
				fs='1.3rem'
				c='rgba(0,0,0,.6)'
			>
				₽
			</Span>
			{/* <Span pl='9px' fs='1.1rem' ws='0.1em'>с НДС</Span> */}
		</>
	)
}
