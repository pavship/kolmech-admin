import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { Input } from '../styled/styled-semantic'
import { isNaN } from '../../utils/format'
import { connect, getIn } from 'formik'

// INFO built-in handling of 'int' number type
// TODO think about integrating other input types (currency, etc..)
class FormikInput extends Component {
	// state = {
	// 	value: this.props.field.curVal || ''
	// }
	// debouncedSetField = debounce(value => {
  //   const { field: { name }, setField } = this.props
  //   setField(name, { value })
	// }, 250)
	// writeVal = (value) => {
	// 	this.setState({ value })
	// 	this.debouncedSetField(value)
	// }
	// handleInputChange = ( e, { value } ) => {
	// 	if (value === '') return this.writeVal('')
	// 	const { type } = this.props
	// 	// block/parse invalid integer input for 'int' input type
	// 	if (type === 'int') {
	// 		const intVal = parseInt(value, 10)
	// 		return intVal && this.writeVal(intVal)
	// 	}
	// 	return this.writeVal(value)
	// }
	// onChanged isn't fired on input with type["number"]
	// when user mixes numbers with symbols -,. for ex -> '234234,,,,,,,234'
	// so I check valueAsNumber html input attr onBlur and set error
	// onBlur = () => {
	// 	const { field: { name }, setField } = this.props
	// 	const { type, valueAsNumber } = this.input.inputRef
	// 	if (type === 'number' && isNaN(valueAsNumber)) {
	// 		// this.input.inputRef.value = ''
	// 		setField(name, { err: {
	// 			title: 'Ошибка в поле "Количество"',
	// 			message: 'Недопустимое значение'
	// 		} })
	// 	}
	// }
	render() {
		// const { 
			// name,
			// value,
			// onChange,
			// type,
			// ...rest } = this.props
		// const { value } = this.state
		const { formik, name, ...rest } = this.props
		return (
			<Input
			// type={type === 'int' ? 'number' : type}
				name={name}
				value={getIn(formik.values, name)}
				error={!!getIn(formik.errors, name)}
				onChange={formik.handleChange}
				{...rest}
				// onBlur={this.onBlur}
				// ref={input => this.input = input}
			/>
		)
	}
}

export default connect(FormikInput)