import { string } from 'yup'

export const idValidationType = string().matches(/^[a-z0-9]{25}$/)