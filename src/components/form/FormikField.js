// !!! deprecated

import React from 'react'
import { connect, getIn } from 'formik'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import { Label } from '../styled/styled-semantic';
import FormikInput from './FormikInput'

const SFormikInput = styled(FormikInput)`
  &&&&&&& {
    display: inline-flex;
    width: 270px;
    >input {
      flex-shrink: 1;
      width: 100%;
    }
  }
  /* ${props => props.err && `
    >div {
      border-width: 1px 1px 1px 0 !important;
    }
  `} */
`

const FormikField = ({
  name,
  formik,
  label,
  required,
  inputLabel,
  inputLabelPosition,
  ...rest
}) => {
  return (
    <Form.Field
      inline
      error={!!getIn(formik.errors, name)}
      required={required}
    >
      <Label
        va='middle !important'
      >
        {label}
      </Label>
      <SFormikInput
        {...rest}
        name={name}
        // onKeyDown={(e, t) => console.log('action > ',e.keyCode === 13)}
        label={inputLabel}
        labelPosition={inputLabelPosition}
      />
    </Form.Field>
  )
}

export default connect(FormikField)