import { object, string } from 'yup'

import { idValidationType } from './commonTypes'

export const validationSchema = object().shape({
  id: idValidationType.notRequired(),
  // orgId: idValidationType
	// 	.when('id', (id, schema) => id
	// 		? schema.notRequired()
	// 		: schema.required('Организация не указана')
	// 	),
  name: string().trim().min(4).max(255)
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required()
    ),
  article: string().trim().min(4).max(10).notRequired(),
})

export const formikSchema = {
  name: '',
  article: ''
}

export const listSchema = {
  name: {
    label: 'Наименование'
  },
  article: {
    label: 'Артикул'
  }
}
