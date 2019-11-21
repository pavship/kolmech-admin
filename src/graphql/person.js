import gql from 'graphql-tag'
import { telFragment } from './tel'
import { opTypeFragmentBasic } from './opType'

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

export const personExecFragment = gql`
	fragment personExecFragment on Person {
		id
		amoName
		exec {
			id
			opTypes { ...opTypeFragmentBasic }
		}
	}
	${opTypeFragmentBasic}
`

export const persons = gql`
	query Persons {
		persons { ...PersonFragmentBasic }
	}
	${personFragmentBasic}
`

export const personExecs = gql`
	query personExecs {
		persons { ...personExecFragment }
	}
	${personExecFragment}
`

export const personExec = gql`
	query personExec ($id: ID!) {
		person (id: $id) { ...personExecFragment }
	}
	${personExecFragment}
`

export const upsertPersonExec = gql`
	mutation upsertPerson2($input: PersonInput!) {
		upsertPerson2(input: $input) {
			...personExecFragment
		}
	}
	${personExecFragment}
`