import gql from 'graphql-tag'

export const highlightFolder = gql`
	mutation highlightFolder ($orgId: ID, $dealId: ID) {
		highlightFolder (orgId: $orgId, dealId: $dealId) {
			statusText
		}
	}
`
