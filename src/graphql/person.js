import gql from 'graphql-tag'
import { telFragment } from './tel'

// TODO switch to using only amoName in the app
export const personFragmentBasic = gql`
	fragment PersonFragmentBasic on Person {
		id
		amoId
		fName
		lName
		mName
		amoName
	}
`

export const personContactsFragment = gql`
	fragment PersonContactsFragment on Person {
		...PersonFragmentBasic
		htmlNote
		tels { ...TelFragment }
		user {
			email
			confirmed
		}
	}
	${telFragment}
	${personFragmentBasic}
`

export const persons = gql`
	query Persons {
		persons { ...PersonFragmentBasic }
	}
	${personFragmentBasic}
`
