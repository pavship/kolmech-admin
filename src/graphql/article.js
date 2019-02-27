import gql from 'graphql-tag'

export const articleFragmentBasic = gql`
	fragment ArticleFragmentBasic on Article {
		id
		rusName
		isIncome
		isLoan
	}
`

export const articleFragmentFull = gql`
	fragment ArticleFragmentFull on Article {
		...ArticleFragmentBasic
		relations
	}
	${articleFragmentBasic}
`
