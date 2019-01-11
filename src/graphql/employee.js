import gql from 'graphql-tag'
import { personContactsFragment } from './person'

export const orgEmployees = gql`
	query OrgEmployees ($orgId: ID!) {
		orgEmployees (orgId: $orgId) {
			id
			position
			person { ...PersonContactsFragment }
		}
	}
	${personContactsFragment}
`

export const upsertEmployee = gql`
	mutation upsertEmployee(
		$input: EmployeeInput!
	) {
		upsertEmployee(
			input: $input
		) {
			id
		}
	}
`