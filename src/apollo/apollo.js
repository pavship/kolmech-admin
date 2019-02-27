import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link'
// import { ApolloLink, Observable, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { onError } from 'apollo-link-error'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
// import { WebSocketLink } from 'apollo-link-ws'
import { AUTH_TOKEN } from '../constants'

import defaults from './defaults'
import resolvers from './resolvers'
// import typeDefs from './typeDefs'

// init with Apollo Client:
const cache = new InMemoryCache({
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

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem(AUTH_TOKEN) || null
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  }))
  return forward(operation)
})

// NOT WORKING!!! TODO find solution to redirect to Login page when token has expired
const refreshToken = (token) => {
	if (token) {
		localStorage.setItem(AUTH_TOKEN, token)
	} else {
		localStorage.removeItem(AUTH_TOKEN)
		client.resetStore()
	}
}

// @ts-ignore
export const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors) {
				console.log('graphQLErrors!!! > ', graphQLErrors)
			}
			if (networkError) {
				console.log('networkError!!! > ', networkError)
				console.log('networkError.name > ', networkError.name)
				console.log('networkError.message > ', networkError.message)
				console.log(networkError.message === 'Unexpected token I in JSON at position 0')
				if (networkError.message === 'Unexpected token I in JSON at position 0') refreshToken(null)
				// logoutUser();
			}
		}),
		authMiddleware,
		withClientState({
      defaults,
			resolvers,
			// typeDefs,
      cache
		}),
		// new HttpLink({ uri: 'http://localhost:4000' })
		createUploadLink({
			uri: 'http://localhost:4000',
			// uri: 'https://now-advanced.now.sh',
			// uri: 'https://env-1542080.mircloud.ru',
		})
	]),
	cache
})

// const httpLink = new HttpLink({ uri: 'https://now-advanced.now.sh' })

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
