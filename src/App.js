import React from 'react'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled/styled-semantic'

import { NotificationsProvider } from './components/notifications/NotificationsContext'
import { DiskProvider } from './components/context/DiskContext'
import Root from './components/Root'

const App = ({ client }) => (
	<NotificationsProvider>
		<ThemeProvider theme={theme}>
			<DiskProvider>
				<Root client={client} />
			</DiskProvider>
		</ThemeProvider>
	</NotificationsProvider>
)

export default App
