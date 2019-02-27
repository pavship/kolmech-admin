import gql from 'graphql-tag'

export const accountFragmentBasic = gql`
	fragment AccountFragmentBasic on Account {
		id
	}
`

export const accountFragmentFull = gql`
	fragment AccountFragmentFull on Account {
		...AccountFragmentBasic
		name
	}
	${accountFragmentBasic}
`