import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker'

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
import typeDefs from './apollo/typeDefs'

import App from './App'

// init with Apollo Boost:
// @ts-ignore
const client = new ApolloClient({
	// uri: 'http://localhost:4000',
	// uri: 'https://now-advanced.now.sh',
	uri: 'https://env-1542080.mircloud.ru',
	request: (operation) => {
		const token = localStorage.getItem(AUTH_TOKEN)
		operation.setContext({
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			}
		})
	},
	onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
			console.log('graphQLErrors!!! > ', graphQLErrors)
      // sendToLoggingService(graphQLErrors);
    }
    if (networkError) {
			console.log('networkError!!! > ', networkError)
			console.log('networkError.name > ', networkError.name)
			console.log('networkError.message > ', networkError.message)
			console.log(networkError.message === 'Unexpected token I in JSON at position 0')
			if (networkError.message === 'Unexpected token I in JSON at position 0') refreshToken(null)
      // logoutUser();
		}
		// networkError!!! >  SyntaxError: Unexpected token I in JSON at position 0
    // at JSON.parse (<anonymous>)
    // at index.js:43
  },
	clientState: {
		defaults,
		resolvers,
		typeDefs
	},
	cache: new InMemoryCache({
		dataIdFromObject: object => {
			switch (object.__typename) {
				case 'NewEnquiry': return 'NewEnquiry'
				default: return defaultDataIdFromObject(object)
			}
		},
		cacheRedirects: {
			Query: {
				orgLocal: (_, args, { getCacheKey }) =>
					getCacheKey({ __typename: 'Org', id: args.id }),
				enquiryLocal: (_, args, { getCacheKey }) =>
					getCacheKey({ __typename: 'Enquiry', id: args.id }),
				orderLocal: (_, args, { getCacheKey }) =>
					getCacheKey({ __typename: 'Order', id: args.id }),
				modelLocal: (_, args, { getCacheKey }) =>
					getCacheKey({ __typename: 'Model', id: args.id }),
				prodsLocal: (_, args, { getCacheKey }) =>
					args.ids.map(id =>
						getCacheKey({ __typename: 'Prod', id: id }))
			}
		}
	})
})

const refreshToken = (token) => {
	if (token) {
		localStorage.setItem(AUTH_TOKEN, token)
	} else {
		localStorage.removeItem(AUTH_TOKEN)
		client.resetStore()
	}
}

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

// client.cache.reset()

ReactDOM.render(
	<ApolloProvider client={client}>
		<App client={client}/>
	</ApolloProvider>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register()  below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
