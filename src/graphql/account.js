import gql from 'graphql-tag'

export const accountFragmentBasic = gql`
	fragment accountFragmentBasic on Account {
		id
	}
`

export const accountFragmentFull = gql`
	fragment accountFragmentFull on Account {
		...accountFragmentBasic
		name
		number
	}
	${accountFragmentBasic}
`