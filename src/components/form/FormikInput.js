import React, { Component } from 'react'
import { connect, getIn } from 'formik'

import FormikCurrency from './FormikCurrency'
import { Input } from '../styled/styled-semantic'
import { Dropdown } from 'semantic-ui-react'

class FormikInput extends Component {
	render() {
		const {
			formik,
			name,
			type,
			options,
			...rest
		} = this.props
		const value = getIn(formik.values, name)
		if (options) return (
			<Dropdown
				{...rest}
				selection
				fluid
				search
				noResultsMessage='Ничего не найдено'
				value={value}
				options={options}
				onChange={(e, {value}) => formik.setFieldValue(name, value)}
			/>
		)
		if (name.endsWith('amount')) return (
			<FormikCurrency
				name={name}
				value={value}
				setField={formik.setFieldValue}
			/>
		)
		return (
			<Input
				{...rest}
				w='100%'
				name={name}
				value={type === 'date' ? value.slice(0,16) : value}
				error={getIn(formik.touched, name) && !!getIn(formik.errors, name)}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
		)
	}
}

export default connect(FormikInput)