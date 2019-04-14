import gql from 'graphql-tag'

export const syncWithTochkaPayments = gql`
	mutation SyncWithTochkaPayments {
		syncWithTochkaPayments {
			count
		}
	}
`
