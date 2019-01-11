import gql from 'graphql-tag'

export const modelLocal = gql`
	query ModelLocal ($id: ID!) {
		modelLocal (id: $id) {
			name
      article
		}
	}
`

export const upsertModel = gql`
	mutation upsertModel(
		$input: ModelInput!
	) {
		upsertModel(
			input: $input
		) {
			id
		}
	}
`