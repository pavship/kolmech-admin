import React from 'react'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styled-semantic/styled-semantic'

import Root from './components/Root'

// use stateless component for production!
// class App extends Component {
// 	render() {
// 		const {token, client} = this.props
// 		return (
// 			<ThemeProvider>
// 				<Root token={token} client={client} />
// 			</ThemeProvider>
// 		)
// 	}
// }

const App = ({ token, client }) => (
	<ThemeProvider theme={theme}>
		<Root token={token} client={client} />
	</ThemeProvider>
)

export default App
