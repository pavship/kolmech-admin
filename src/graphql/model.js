import gql from 'graphql-tag'

export const modelLocal = gql`
	query ModelLocal ($id: ID!) {
		modelLocal (id: $id) {
			name
      article
		}
	}
`