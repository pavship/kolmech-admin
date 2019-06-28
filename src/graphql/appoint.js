import gql from 'graphql-tag'
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
		factCost
		factLabor
		planCost
		planLabor
		exec { ...execFragmentBasic }
		tasks { ...taskFragmentMiddle }
	}
	${appointFragmentBasic}
	${execFragmentBasic}
	${taskFragmentMiddle}
`

export const upsertAppoint = gql`
	mutation upsertAppoint($input: AppointInput!) {
		upsertAppoint(input: $input) {
			...appointFragmentMiddle
		}
	}
	${appointFragmentMiddle}
`