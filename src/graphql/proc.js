import gql from 'graphql-tag'
import { opFragmentBasic, opFragmentMiddle, opFragmentDetails } from './op'

export const procFragmentBasic = gql`
	fragment procFragmentBasic on Proc {
		id
		name
		ops { ...opFragmentBasic }
	}
	${opFragmentBasic}
`

export const procFragmentMiddle = gql`
	fragment procFragmentMiddle on Proc {
		...procFragmentBasic
		ops { ...opFragmentMiddle }
	}
	${procFragmentBasic}
	${opFragmentMiddle}
`

export const procFragmentDetails = gql`
	fragment procFragmentDetails on Proc {
		...procFragmentBasic
		ops { ...opFragmentDetails }
	}
	${procFragmentBasic}
	${opFragmentDetails}
`