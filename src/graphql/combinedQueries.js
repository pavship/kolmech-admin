import gql from 'graphql-tag'

export const allOrgsAndModels = gql`
    query AllOrgsAndModels {
        orgs {
            id
            inn
            name
        }
        models {
            id
            article
            name
        }
    }
`