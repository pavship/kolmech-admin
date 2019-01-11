import gql from 'graphql-tag'
import { telFragment } from './tel'

export const personContactsFragment = gql`
	fragment PersonContactsFragment on Person {
		id
		fName
		lName
		mName
		htmlNote
		tels { ...TelFragment }
		user {
			email
			confirmed
		}
	}
	${telFragment}
`