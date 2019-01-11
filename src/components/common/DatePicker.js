import React from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import styled from 'styled-components'

import { toLocalISOString } from '../../utils/dates'

const PickerDiv = styled.div`
	display: inline-block;
	width: 180px;
	${props => props.err && `
		input {
			color: #9f3a38 !important;
			background-color: #fff6f6 !important;
			border-color: #e0b4b4 !important;
		}`
	}
	input {
		cursor: pointer;
		vertical-align: unset !important;
		padding-left: 3.5rem !important;
		&:focus {
			cursor: text;
		}
	}
`

// TODO logic may be deprecated (check with enremkol-dev)
const DatePicker = ({ selectedDate, selectDay, error }) => {
	return (
		<PickerDiv error={error}>
			<DayPickerInput
				value={toLocalISOString(selectedDate).slice(0, 10)}
				onDayChange={selectDay}
				dayPickerProps={{
					firstDayOfWeek: 1,
					month: selectedDate
				}}
			/>
		</PickerDiv>
	)
}

export default DatePicker
