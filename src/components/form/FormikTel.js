import React, { Component } from 'react'
import { connect, getIn } from 'formik'
import { Form } from 'semantic-ui-react'
import { Label, Input } from '../styled/styled-semantic';
import InputMask from 'react-input-mask'
import FormikInput from './FormikInput.js';

class FormikTelField extends Component {
  // state = {
  //   value: this.props.field.curVal || '',
  // }
  // debouncedSetField = debounce(value => {
  //   const { field: { name }, setField } = this.props
  //   setField(name, { value })
  // }, 250)
  // handleInputChange = ({ target: { value } }) => {
  //   this.setState({ value })
	// 	this.debouncedSetField(value)
  // }
  render() {
    const {
      name,
      formik,
      label,
      required,
      inputLabel,
      country,
      ...rest
    } = this.props
    return (
      <Form.Field
        inline
        error={!!getIn(formik.errors, name)}
        required={required}
      >
        <Label>{label || 'Телефон'}</Label>
        {country === 'rus'
          ? <InputMask
              name={name}
              mask='( 999 ) 999-99-99'
              maskChar=''
              value={getIn(formik.values, name)}
              onChange={formik.handleChange}
            >
              {(inputProps) =>
                <Input
                  w='270px !important'
                  // placeholder='Номер телефона'
                  label={inputLabel}
                  {...rest}
                  {...inputProps}
                />
              }
            </InputMask>
          : <FormikInput
              w='270px !important'
              name={name}
              // placeholder='Телефон с кодом страны'
              label={inputLabel}
              {...rest}
            />
        }
      </Form.Field>
    )
  }
}

export default connect(FormikTelField)
