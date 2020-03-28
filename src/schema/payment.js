import { object, number, string, date } from 'yup'
import { idValidationType } from './commonTypes'
import { toLocalISOString } from '../utils/dates';

export const validationSchema = object().shape({
  id: idValidationType.notRequired(),
  accountId: idValidationType
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('выберите счет для проведения платежа')
    ),
  articleId: idValidationType
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('выберите основание платежа')
    ),
  amount: number()
    .positive('зачение должно быть положительным')
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('введите сумму платежа'),
    ),
  dateLocal: date('неверный формат даты')
    .when('id', (id, schema) => id
      ? schema.notRequired()
      : schema.required('введите дату и время в формате ГГГГ-ММ-ДДTЧЧ:ММ'),
    ),
    // TODO create proper isValidISODate function to check date
    // .transform(function(value, originalValue) {
    //   return isValidISODate(value) ? value : new Date('');
    // }),
  mpProjectId: number()
    .integer()
    .notRequired(),
  // mpProjectId: idValidationType
  //   .notRequired(),
  personId: idValidationType
    .notRequired(),
    // TODO I'm disappointed with yup. Schema definition rules are not semantic, need to change to something else!
    // .when('id', (id, schema) => id
    //   ? schema.notRequired()
    //   : schema.required('выберите контрагента')
    // ),
  // orgId: idValidationType
  //   .notRequired(),
  inn: string()
    .min(10, 'ИНН может быть 10-ти или 12-ти значным')
    .max(12, 'ИНН может быть 10-ти или 12-ти значным')
    .notRequired(),
  purpose: string()
    .max(250, 'превышено максимальное число символов (250)')
    .notRequired(),
})

export const formikSchema = (date, defaultAccountId) => ({
  dateLocal: toLocalISOString(date),
  accountId: defaultAccountId || "",
  articleId: '',
  personId: '',
  inn: '',
  purpose: '',
  mpProjectId: '',
  amount: ''
})
