import gql from 'graphql-tag'

export const accountFragmentBasic = gql`
	fragment accountFragmentBasic on Account {
		id
	}
`

export const accountFragmentFull = gql`
	fragment accountFragmentFull on Account {
		...accountFragmentBasic
		balance
		name
		number
	}
	${accountFragmentBasic}
`

export const accounts = gql`
	query accounts {
		accounts { ...accountFragmentFull }
	}
	${accountFragmentFull}
`