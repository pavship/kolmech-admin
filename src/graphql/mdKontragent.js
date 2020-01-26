import gql from 'graphql-tag'

export const mdKontragentFragmentBasic = gql`
	fragment mdKontragentFragmentBasic on MdKontragent {
    Id
    Inn
		Name
	}
`

export const createMdKontragent = gql`
	mutation createMdKontragent($inn: String!) {
		createMdKontragent(inn: $inn) {
			...mdKontragentFragmentBasic
		}
	}
	${mdKontragentFragmentBasic}
`
