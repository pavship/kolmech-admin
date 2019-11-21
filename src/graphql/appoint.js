import gql from 'graphql-tag'
import { bpStatFragmentMiddle } from './bpStat'
import { execFragmentBasic } from './exec'
import { taskFragmentMiddle } from './task'

export const appointFragmentBasic = gql`
	fragment appointFragmentBasic on Appoint {
		id
	}
`

export const appointFragmentMiddle = gql`
	fragment appointFragmentMiddle on Appoint {
		...appointFragmentBasic
		laborCost
		bpStat { ...bpStatFragmentMiddle }
		exec { ...execFragmentBasic }
		tasks { ...taskFragmentMiddle }
	}
	${bpStatFragmentMiddle}
	${appointFragmentBasic}
	${execFragmentBasic}
	${taskFragmentMiddle}
`

export const appointFragmentExec = gql`
	fragment appointFragmentExec on Appoint {
		...appointFragmentBasic
		exec { ...execFragmentBasic }
	}
	${appointFragmentBasic}
	${execFragmentBasic}
`

export const appointExecLocal = gql`
	query appointExecLocal ($id: ID!) {
		appoint (id: $id) @client {
			id
		}
	}
`

export const upsertAppoint = gql`
	mutation upsertAppoint($input: AppointInput!) {
		upsertAppoint(input: $input) {
			...appointFragmentMiddle
		}
	}
	${appointFragmentMiddle}
`