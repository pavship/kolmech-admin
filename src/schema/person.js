import { lazy, array, object, string } from 'yup'

import { validationSchema as telValidationSchema } from './tel'
import { idValidationType } from './commonTypes'

export const validationSchema = object().shape({
	id: idValidationType.notRequired(),
	lName: lazy(val => !val
		? string()
		: string().trim().min(2).max(255)
	),
	fName: string().trim().min(2).max(255)
		.when('id', (id, schema) => id
			? schema.notRequired()
			: schema.required('Пропущено обязательное поле Имя')
		)
  ,
	mName: lazy(val => !val
		? string()
		: string().trim().min(2).max(255)
	),
	tels: array().of(telValidationSchema)
})