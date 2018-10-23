import gql from 'graphql-tag'

export const statusFragment = gql`
	fragment StatusFragment on Status {
		id
    name
    stage
	}
`