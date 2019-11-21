import gql from 'graphql-tag'
import { opTypeFragmentBasic } from './opType'
import { appointFragmentMiddle } from './appoint'

export const opFragmentBasic = gql`
	fragment opFragmentBasic on Op {
		id
		dealLabor
		opType { ...opTypeFragmentBasic }
	}
	${opTypeFragmentBasic}
`

export const opFragmentMiddle = gql`
	fragment opFragmentMiddle on Op {
		...opFragmentBasic
		laborPrice
		appoints { ...appointFragmentMiddle }
	}
	${opFragmentBasic}
	${appointFragmentMiddle}
`

export const opFragmentDetails = gql`
	fragment opFragmentDetails on Op {
		...opFragmentBasic
		description
	}
	${opFragmentBasic}
`

export const upsertOp = gql`
	mutation upsertOp($input: OpInput!) {
		upsertOp(input: $input) {
			...opFragmentMiddle
		}
	}
	${opFragmentMiddle}
`