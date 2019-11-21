import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './apollo/apollo'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled/styled-semantic'

import { NotificationsProvider } from './components/notifications/NotificationsContext'
import { DiskProvider } from './components/context/DiskContext'
import { AuthProvider } from './components/auth/AuthContext'
import Root from './components/Root'

export default function App () {
	return (
		<ApolloProvider client={client}>
			<NotificationsProvider>
				<ThemeProvider theme={theme}>
					<DiskProvider>
						<AuthProvider apolloClient={client}>
							<Root />
						</AuthProvider>
					</DiskProvider>
				</ThemeProvider>
			</NotificationsProvider>
		</ApolloProvider>
	)
}
