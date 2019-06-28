import React, { useState, useEffect, useRef } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import styled from 'styled-components'

import { toLocalISOString, isValidDate, isValidDateString } from '../../utils/dates'
import { Button } from 'semantic-ui-react';

const PickerDiv = styled.div`
	display: inline-block;
	width: 180px;
	${props => props.error && `
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
export default ({
	selectedDate,
	selectDay,
	error
}) => {
	const inputRef = useRef(null)
	const [ date, setDate ] = useState(selectedDate || new Date())
	const [ input, setInput ] = useState(toLocalISOString(date).slice(0, 10))
	const [ err, setErr ] = useState('')
	// useEffect(() => {
	// 	isValidDate(selectedDate)
	// 		? setDate(selectedDate) || setErr('') || setInput(toLocalISOString(date).slice(0, 10))
	// 		: setErr('Provided date is not valid')
	// }, [selectedDate])
	// useEffect(() => {
	// 	console.log('useEffect > ') || setDate(selectedDate)
	// 	|| setInput(toLocalISOString(selectedDate).slice(0, 10))
	// }, [date, selectedDate, input])
	useEffect(() => {
		console.log('useEffect > ') || setDate(selectedDate)
		|| setInput(toLocalISOString(selectedDate).slice(0, 10))
	}, [selectedDate])
	console.log(' render > date, input, err > ', date, input, err)
	return (
		<PickerDiv
			error={err}
		>
			<Button
				onClick={() => setInput(input.slice(0,-1))}
			>
				Click ME!
			</Button>
			<DayPickerInput
				ref={inputRef}
				value={input}
				onDayChange={date => {
					// console.log('inputRef > ', inputRef.current.input.value)
					console.log('onDateChange > ') ||
					isValidDateString(inputRef.current.input.value)
						? setErr('') || setDate(date)
						: setErr('Provided date is not valid')
				}}
				onDayPickerHide={() => {
					console.log('onDayPickerHide > ')
					console.log('selectedDate > ', selectedDate)
					console.log('toLocalISOString(selectedDate).slice(0, 10) > ', toLocalISOString(selectedDate).slice(0, 10))
					console.log('inputRef.current.input.value > ', inputRef.current.input.value)
					console.log('isValidDateString(inputRef.current.input.value) > ', isValidDateString(inputRef.current.input.value))
					console.log('((date.getTime() !== selectedDate.getTime()) > ', date.getTime() !== selectedDate.getTime())
					
					return ((date.getTime() !== selectedDate.getTime())
						&& isValidDateString(inputRef.current.input.value))
							?	(console.log('selectDay > ') || selectDay(date))
							// : (console.log('setDate & input > ') || setDate(selectedDate)|| setInput(toLocalISOString(selectedDate).slice(0, 10))) || setErr('')
							: (console.log('setDate & input > ')
								|| setDate(selectedDate)
								|| setInput(toLocalISOString(selectedDate).slice(0, 10)))
								|| setErr('')
								|| (inputRef.current.input.value = toLocalISOString(selectedDate).slice(0, 10))
				}
						// ? setErr('') || setDate(date)
						// : setErr('Provided date is not valid')
					// console.log('date, selectedDate > ', date, selectedDate)
					// (date.getTime() !== selectedDate.getTime()) && selectDay(date)
					// () => (date.getTime() !== selectedDate.getTime()) && selectDay(date)
					// console.log('onDayPickerHide > ', date)
					// selectDay(date)
				}
				dayPickerProps={{
					firstDayOfWeek: 1,
					month: selectedDate
				}}
			/>
		</PickerDiv>
	)
}
