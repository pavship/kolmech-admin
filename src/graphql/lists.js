import gql from 'graphql-tag'

export const getLists = gql`
	query getLists {
		lists @client {
			selectedProdIds
		}
	}
`

export const getListsOptions = ({
	props: ({ data: { lists } }) => ({
    lists: lists || {}
	})
})

export const setList = gql`
	mutation SetList($name: String!, $value: [ID!]) {
		setList(name: $name, value: $value) @client {
			result
		}
	}
`