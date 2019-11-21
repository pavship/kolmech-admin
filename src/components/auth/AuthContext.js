import React, { useState, useEffect } from 'react'

import { AUTH_TOKEN } from '../../constants'
import { isTokenExpired } from '../../utils/jwtHelper'

import LoginPage from './LoginPage'

export const AuthContext = React.createContext()
export default AuthContext

export function AuthProvider ({
  children,
	apolloClient
}) {
	const [ token, setToken ] = useState(localStorage.getItem(AUTH_TOKEN))
	useEffect(() => {bootStrapData()}, [])
	const bootStrapData = () => {
		try {
			const token = localStorage.getItem(AUTH_TOKEN)
			if (token !== null && token !== undefined) {
				const expired = isTokenExpired(token)
				if (expired) {
					refreshToken(null)
				} else {
					setToken(token)
				}
			}
		} catch (e) {
			console.log('bootStrapData error')
		}
	}
	const refreshToken = token => {
		if (token) {
			localStorage.setItem(AUTH_TOKEN, token)
		} else {
			localStorage.removeItem(AUTH_TOKEN)
			console.log('apolloClient > ', apolloClient)
			if (apolloClient) apolloClient.resetStore()
		}
		setToken(token)
	}
  return <AuthContext.Provider
    value={{ refreshToken }}
  >
    {token
      ? children
      : <LoginPage
          refreshToken={refreshToken}
        />
    }
  </AuthContext.Provider>
}
