import gql from 'graphql-tag'

export const me = gql`
	query Me {
		me {
			id
			email
			person {
				id
				fName
				lName
				exec {
					id
				}
			}
			role
		}
	}
`

export const meLocal = gql`
	query MeLocal {
		me @client {
			person {
				fName
				lName
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