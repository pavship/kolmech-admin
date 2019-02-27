import React, { Component } from 'react'
import { connect, getIn } from 'formik'
import InputMask from 'react-input-mask'
import styled from 'styled-components'
import { Dropdown as SDropdown } from 'semantic-ui-react';
import { Input } from '../styled/styled-semantic';
import FormikInput from './FormikInput.js';

const countryOtions = [
  { key: 'rus', text: '+7', value: 'rus' },
  { key: 'notRus', text: '+', value: 'notRus' },
]

const DropdownPropFilter = ({ inputError, ...rest }) => (
	<SDropdown {...rest} />
)
export const Dropdown = styled(DropdownPropFilter)`
	&&&&&& {
    ${props => props.inputError && `
      border: 1px solid ${props.theme.colors.errorBorder};
      border-right-color: transparent;
    `}
	}
`

const Error = styled.div`
  color: ${props => props.theme.colors.error};
`

class Tel extends Component {
  render() {
    const {
      baseName,
      formik,
      ...rest
    } = this.props
    const number = getIn(formik.values, baseName + '.number')
    const country = getIn(formik.values, baseName + '.country')
    const touched = getIn(formik.touched, baseName + '.number')
    const error = getIn(formik.errors, baseName)
    const renderDropdown =() => (
      <Dropdown
        tabIndex={-1}
        name={baseName + '.country'}
        value={country}
        options={countryOtions}
        inputError={touched && !!error}
        onChange={(e, { name, value }) => formik.setFieldValue( name, value )}
      />
    )
    return <>
      {country === 'rus'
        ? <InputMask
            name={baseName + '.number'}
            mask='( 999 ) 999-99-99'
            maskChar=''
            value={number}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {(inputProps) =>
              <Input
                w='240px !important'
                // placeholder='Номер телефона'
                error={touched && !!error}
                label={renderDropdown()}
                {...rest}
                {...inputProps}
              />
            }
          </InputMask>
        : <FormikInput
            w='240px !important'
            name={baseName + '.number'}
            error={touched && !!error}
            // placeholder='Телефон с кодом страны'
            label={renderDropdown()}
            {...rest}
          />
      }
      <Error>
        {touched && error && error.number}
      </Error>
    </>
  }
}

export default connect(Tel)
