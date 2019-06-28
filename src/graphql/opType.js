import gql from 'graphql-tag'

export const opTypeFragmentBasic = gql`
	fragment opTypeFragmentBasic on OpType {
		id
		name
		opClass
	}
`