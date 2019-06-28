import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-vis/dist/style.css'
import * as serviceWorker from './serviceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { client } from './apollo/apollo'

import App from './App'

ReactDOM.render(
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<App client={client}/>
		</ApolloHooksProvider>
	</ApolloProvider>
, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register()  below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
