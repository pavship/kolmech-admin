import gql from 'graphql-tag'

export const dealStatusFragmentBasic = gql`
	fragment DealStatusFragmentBasic on DealStatus {
    id
    name
    color
    sort
	}
`

export const dealStatusFragmentFull = gql`
	fragment DealStatusFragmentFull on DealStatus {
		...DealStatusFragmentBasic
    amoId
	}
	${dealStatusFragmentBasic}
`
