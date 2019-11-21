import gql from 'graphql-tag'
import { procFragmentBasic, procFragmentMiddle, procFragmentDetails } from './proc'
import { opFragmentMiddle } from './op'
import { bpStatFragmentMiddle } from './bpStat'

export const elementFragmentBasic = gql`
	fragment elementFragmentBasic on Element {
    id
    sort
    proc { ...procFragmentBasic }
  }
  ${procFragmentBasic}
`

export const elementFragmentMiddle = gql`
	fragment elementFragmentMiddle on Element {
		...elementFragmentBasic
		op { ...opFragmentMiddle }
		proc { ...procFragmentMiddle }
	}
	${elementFragmentBasic}
	${opFragmentMiddle}
	${procFragmentMiddle}
`

export const elementFragmentDetails = gql`
	fragment elementFragmentDetails on Element {
		...elementFragmentBasic
		proc { ...procFragmentDetails }
	}
	${elementFragmentBasic}
	${procFragmentDetails}
`