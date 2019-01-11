import { object, lazy, string } from 'yup'

import { validationSchema as personValidationSchema } from './person'
import { idValidationType } from './commonTypes'

export const validationSchema = object().shape({
  id: idValidationType.notRequired(),
  orgId: idValidationType
		.when('id', (id, schema) => id
			? schema.notRequired()
			: schema.required()
		),
  person: personValidationSchema
})

export const formikSchema = {
  person: {
    lName: '',
    fName: '',
    mName: '',
    tels: [{
      number: '',
      country: 'rus',
    }]
  }
}

export const listSchema = {
  person: {
    lName: {
      label: 'Фамилия'
    },
    fName: {
      label: 'Имя'
    },
    mName: {
      label: 'Отчество'
    },
    tels: [{
      label: 'Телефон',
      type: 'tel'
    }]
  }
}
