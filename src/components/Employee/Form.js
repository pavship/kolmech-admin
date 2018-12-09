import React, { Component } from 'react'
import cloneDeep from 'lodash/cloneDeep'

import { Mutation } from 'react-apollo'
import { upsertEmployee, orgEmployees } from '../../graphql/employee'

import { Formik } from 'formik'
import { projectEntity, preparePayload } from '../form/utils'
import { formikSchema, validationSchema } from '../../schema/employee'
import Field from '../form/Field'

import { Button, A, Message } from '../styled/styled-semantic'

// position
// fName
// lName
// mName
// htmlNote
// tels { ...TelFragment }
// user {
//   email
//   confirmed
// }

export default class EmployeeForm extends Component {
  didMount = false
  componentDidMount() { this.didMount = true }
  componentWillUnmount() { this.didMount = false }
  render() {
    const {
      emp,
      orgId,
      toggleEditMode,
      refetchQueries
    } = this.props
    let schema = emp ? formikSchema : {...formikSchema, orgId}
    const initialValues = emp ? projectEntity(emp, schema) : schema
    return (
      <Mutation
        mutation={upsertEmployee}
        // onCompleted={refetchQueries}
        // onError={refetchQueries}
        // onError={(err) => console.log('err > ', err)}
        // refetchQueries={[{
        //   query: orgEmployees,
        //   variables: {
        //     orgId
        //   }
        // }]}
      >
        {(upsertEmployee, { loading, error }) =>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(emp)}
            onSubmit={async (values, { resetForm }) => {
              console.log('initialValues > ', initialValues)
              const input = preparePayload(values, initialValues, schema)
              console.log('upsertEmployee input > ', input)
              const upserted = await upsertEmployee({ variables: { input } })
              console.log('upserted > ', upserted)
              return emp
                ? toggleEditMode()
                : this.didMount && resetForm()
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleReset,
              setFieldValue
            }) =>
              <>
                <Field
                  label='Фамилия'
                  name='person.lName'
                />
                <Field
                  label='Имя'
                  required
                  name='person.fName'
                />
                <Field
                  label='Отчество'
                  name='person.mName'
                />
                <Field
                  label='Телефон'
                  name='person.tels'
                />
                {!!error &&
                  <Message
                    error
                    header='Не удалось добавить..'
                    content={error && error.message}
                  />
                }
                <Button
                  ml='122px'
                  // type="submit"
                  type='button'
                  primary
                  content={emp ? 'Сохранить' : 'Добавить'}
                  loading={loading}
                  onClick={handleSubmit}
                />
                <A cancel
                  onClick={ emp ? toggleEditMode : handleReset}
                >
                  {emp ? 'Отмена' : 'Очистить'}
                </A>
              </>
            }
          </Formik>
        }
      </Mutation>
    )
  }
}
