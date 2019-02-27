import ApolloClient from 'apollo-boost'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { AUTH_TOKEN } from '../constants'

import defaults from './defaults'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

// init with Apollo Boost:
// @ts-ignore
export const client = new ApolloClient({
	uri: 'http://localhost:4000',
	// uri: 'https://now-advanced.now.sh',
	// uri: 'https://env-1542080.mircloud.ru',
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
