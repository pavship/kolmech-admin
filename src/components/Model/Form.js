import React, { Component } from 'react'

import { Mutation } from 'react-apollo'
import { upsertModel } from '../../graphql/model'

import { Formik } from 'formik'
import { projectEntity, preparePayload } from '../form/utils'
import { formikSchema, validationSchema } from '../../schema/model'
import Field from '../form/FormikField'

import { Button, A, Message } from '../styled/styled-semantic'

export default class ModelForm extends Component {
  didMount = false
  componentDidMount() { this.didMount = true }
  componentWillUnmount() { this.didMount = false }
  render() {
    const {
      model,
      orgId,
      toggleEditMode,
      refetchQueries,
      onSubmit,
    } = this.props
    let schema = model ? formikSchema : {...formikSchema, orgId}
    const initialValues = model ? projectEntity(model, schema) : schema
    return (
      <Mutation
        mutation={upsertModel}
        onCompleted={() => refetchQueries()}
      >
        {(upsertModel, { loading, error }) =>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              // console.log('values > ', values)
              // console.log('initialValues > ', initialValues)
              const input = preparePayload(values, initialValues, schema)
              // console.log('upsertModel input > ', input)
              const upserted = await upsertModel({ variables: { input } })
              // console.log('upserted > ', upserted)
              return model
                ? toggleEditMode()
                : this.didMount && onSubmit(upserted.data.upsertModel.id)
            }}
          >
            {({
              handleSubmit,
              handleReset,
            }) =>
              <>
                <Field
                  label='Наименование'
                  name='name'
                  required
                />
                <Field
                  label='Артикул'
                  name='article'
                />
                {!!error &&
                  <Message
                    d='block !important'
                    error
                    header='Не удалось добавить..'
                    content={error && error.message}
                  />
                }
                <Button
                  ml='122px'
                  type='button'
                  primary
                  content={model ? 'Сохранить' : 'Добавить'}
                  loading={loading}
                  onClick={handleSubmit}
                />
                <A cancel
                  onClick={ model ? toggleEditMode : handleReset}
                >
                  {model ? 'Отмена' : 'Очистить'}
                </A>
              </>
            }
          </Formik>
        }
      </Mutation>
    )
  }
}
