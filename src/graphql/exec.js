import gql from 'graphql-tag'
import { orgExecFragment } from './org'
import { personFragmentBasic, personExecFragment } from './person'

export const execFragmentBasic = gql`
	fragment execFragmentBasic on Exec {
		id
		person { ...PersonFragmentBasic }
	}
	${personFragmentBasic}
`

export const orgsAndPersonsExecs = gql`
	query orgsAndPersonsExecs {
		orgs { ...orgExecFragment }
		persons { ...personExecFragment }
	}
	${orgExecFragment}
	${personExecFragment}
`

export const upsertExec = gql`
	mutation upsertExec($input: ExecInput!) {
		upsertExec(input: $input) {
			id
		}
	}
`