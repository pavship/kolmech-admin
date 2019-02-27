import gql from 'graphql-tag'

export const syncWithAmoContacts = gql`
	mutation SyncWithAmoContacts {
		syncWithAmoContacts {
			count
		}
	}
`
