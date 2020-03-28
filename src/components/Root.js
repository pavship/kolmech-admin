import React, { useContext } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { useQuery } from './hooks/apolloHooks'
import { me as meQuery } from '../graphql/user'
import AuthContext from './auth/AuthContext'
import UserContext from './context/UserContext'

import EnquiriesPage from './Enquiry/EnquiriesPage'
import PaymentsPage from './Payments/Page'
import DealsPage from './Deals/Page'

export default function Root () {
	const { refreshToken } = useContext(AuthContext)
	const { data, loading, error } = useQuery(meQuery)
	if (!loading && !error && !data) refreshToken(null)
	const me = data && data.me
	return <>
		{!error && loading || !me ? 'Загрузка..' :
			<UserContext.Provider
				value={{ me }}
			>
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							component={EnquiriesPage}
						/>
						<Route
							path="/pay"
							component={PaymentsPage}
						/>
						<Route
							path="/deals"
							component={DealsPage}
						/>
						<Redirect to="/" />
					</Switch>
				</Router>
			</UserContext.Provider>
		}
	</>
}
