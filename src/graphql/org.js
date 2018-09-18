import gql from 'graphql-tag'

export const org = gql`
    query org ($id: ID!) {
        org (id: $id) {
            id
            inn
            name
        }
    }
`

export const allOrgs = gql`
    query allOrgs {
        orgs {
            id
            inn
            name
        }
    }
`

export const createOrg = gql`
    mutation createOrg($inn: String!) {
        createOrg(inn: $inn) {
            id
			inn
            name
        }
    }
`