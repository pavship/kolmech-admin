import gql from 'graphql-tag'

export const docFragmentBasic = gql`
	fragment DocFragmentBasic on Doc {
		id
		type
		dateLocal
		amount
	}
`