import React, { Component } from 'react'
import { Input } from '../styled/styled-semantic'
import { connect, getIn } from 'formik'

class FormikInput extends Component {
	render() {
		const { formik, name, ...rest } = this.props
		return (
			<Input
				w='100%'
				name={name}
				value={getIn(formik.values, name)}
				error={getIn(formik.touched, name) && !!getIn(formik.errors, name)}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				{...rest}
			/>
		)
	}
}

export default connect(FormikInput)