import gql from 'graphql-tag'
import { accountFragmentFull } from './account'

export const userFragmentBasic = gql`
	fragment userFragmentBasic on User {
		id
		person {
			id
			amoName
		}
	}
`

export const me = gql`
	query Me {
		me {
			id
			email
			person {
				id
				fName
				lName
				amoName
				exec {
					id
				}
			}
			role
			account { ...accountFragmentFull }
			accounts { ...accountFragmentFull }
		}
	}
	${accountFragmentFull}
`

export const meLocal = gql`
	query MeLocal {
		me @client {
			person {
				fName
				lName
				amoName
			}
		}
	}
`

export const login = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`