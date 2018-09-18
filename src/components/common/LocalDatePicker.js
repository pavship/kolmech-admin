import React, { Component } from 'react'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import styled from 'styled-components'

import { isValidDate, toLocalISOString, fromLocalISOString }from '../../utils/dates'

const PickerDiv = styled.div`
	display: inline-block;
	${props => props.err && `
		input {
			color: #9f3a38 !important;
			background-color: #fff6f6 !important;
			border-color: #e0b4b4 !important;
		}`
	}
`

class LocalDatePicker extends Component {
    state = {
        err: false
    }
    handleDayChange = (pickedDate) => {
        console.log('pickedDate > ', pickedDate)
        if (!isValidDate(pickedDate)) {
            this.props.setFormFieldError('dateLocal', {
                title: 'Ошибка ввода даты', 
                message: 'Дата не соответствует формату ГГГГ-ММ-ДД'
            })
            return
        }
        this.setState({ err: false })
        this.props.setFormFieldValue('dateLocal', toLocalISOString(pickedDate).slice(0, 10))
    }
    render() {
        const { value, err } = this.props
        return (
            <PickerDiv err={!!err.message}>
                <DayPickerInput
                    value={value}
                    onDayChange={this.handleDayChange}
                    dayPickerProps={{
                        firstDayOfWeek: 1,
                        month: fromLocalISOString(value)
                    }}
                />
            </PickerDiv>
        )
    }
}

export default LocalDatePicker
