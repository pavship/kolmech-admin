import gql from 'graphql-tag'
import { personFragmentBasic, personExecFragment } from './person';

export const syncWithAmoContacts = gql`
	mutation SyncWithAmoContacts {
		syncWithAmoContacts {
			...PersonFragmentBasic
			...personExecFragment
		}
	}
	${personFragmentBasic}
	${personExecFragment}
`
