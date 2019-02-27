import gql from 'graphql-tag'

export const modelProds = gql`
	query ModelProds ($modelId: ID!) {
		modelProds (modelId: $modelId) {
			id
			fullnumber,
      hasDefect,
      isSpoiled,
      progress,
			dept {
				id
				name
				type
			}
			order {
				id
				fullnum
				enquiry {
					id
					num
				}
			}
		}
	}
`
export const prodsLocal = gql`
	query ProdsLocal ($ids: [ID!]!) {
		prodsLocal (ids: $ids) {
			id
			fullnumber,
      hasDefect,
      isSpoiled,
      progress,
			dept {
				id
				name
				type
			}
		}
	}
`
