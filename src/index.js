import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import registerServiceWorker from './registerServiceWorker'

import ApolloClient from 'apollo-boost'
// import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
// import { withClientState } from 'apollo-link-state';
// import { ApolloLink, split } from 'apollo-link'
// import { getMainDefinition } from 'apollo-utilities'
// import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { AUTH_TOKEN } from './constants'

import defaults from './apollo/defaults'
import resolvers from './apollo/resolvers'

import App from './App'

// init with Apollo Boost:
// @ts-ignore
const client = new ApolloClient({
    uri: 'http://localhost:4000',
    // uri: 'https://now-advanced.now.sh',
    // uri: 'http://node62506-env-1542080.mircloud.ru:11268/',
    request: (operation) => {
        const token = localStorage.getItem(AUTH_TOKEN)
        operation.setContext({
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            }
        })
    },
    clientState: {
        defaults,
        resolvers,
        // typeDefs
    },
    cache: new InMemoryCache({
        dataIdFromObject: object => {
            switch (object.__typename) {
                case 'NewEnquiry': return 'NewEnquiry'
                default: return defaultDataIdFromObject(object)
            }
        }
    })
})

// const cache = new InMemoryCache({
//     dataIdFromObject: object => {
//         switch (object.__typename) {
//             case 'NewEnquiry': return 'NewEnquiry'
//             default: return defaultDataIdFromObject(object)
//         }
//     }
// })

// const stateLink = withClientState({
//     cache,
//     defaults,
//     resolvers,
//     // typeDefs
// })

// const httpLink = new HttpLink({ uri: 'https://now-advanced.now.sh' })

// const middlewareAuthLink = new ApolloLink((operation, forward) => {
//     // get the authentication token from local storage if it exists
//     const tokenValue = localStorage.getItem(AUTH_TOKEN)
//     // return the headers to the context so httpLink can read them
//     operation.setContext({
//       headers: {
//         Authorization: tokenValue ? `Bearer ${tokenValue}` : '',
//       },
//     })
//     return forward(operation)
// })
// slightly different auth link init implementation -> https://www.apollographql.com/docs/react/recipes/authentication.html

// // authenticated httplink
// const httpLinkAuth = middlewareAuthLink.concat(httpLink)

// const wsLink = new WebSocketLink({
//     uri: `ws://now-advanced.now.sh`,
//     options: {
//         reconnect: true,
//         connectionParams: {
//         Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
//         },
//     },
// })
  
// const link = split(
//     // split based on operation type
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     httpLinkAuth,
// )

// const client = new ApolloClient({
//     cache,
//     link: ApolloLink.from([
//         stateLink,
//         httpLinkAuth
//     ]),
//     connectToDevTools: true,
// })

const token = localStorage.getItem(AUTH_TOKEN)

// client.cache.reset()

ReactDOM.render(
    <ApolloProvider client={client}>
        <App token={token} client={client}/>
    </ApolloProvider>
, document.getElementById('root'))

registerServiceWorker()
