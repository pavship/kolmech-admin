import gql from 'graphql-tag'

export const bpStatFragmentBasic = gql`
	fragment bpStatFragmentBasic on BpStat {
		id
	}
`

export const bpStatFragmentMiddle = gql`
	fragment bpStatFragmentMiddle on BpStat {
		...bpStatFragmentBasic
		factCost
		factLabor
		factRevenue
		planCost
		planLabor
		planRevenue
	}
	${bpStatFragmentBasic}
`
