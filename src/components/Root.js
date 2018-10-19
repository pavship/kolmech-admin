import React, { Component, Fragment } from 'react'

import { AUTH_TOKEN } from '../constants'
import { isTokenExpired } from '../utils/jwtHelper'

import { Query } from 'react-apollo'
import { me } from '../graphql/user'

import LoginPage from './LoginPage'
import EnquiriesPage from './EnquiriesPage'

class Root extends Component {
	state = {
		token: this.props.token
	}
	 //verify localStorage check
	componentDidMount() {
		this.bootStrapData()
	}
	bootStrapData = () => {
		try {
			const token = localStorage.getItem(AUTH_TOKEN)
			if (token !== null && token !== undefined) {
				const expired = isTokenExpired(token)
				if (!expired) {
					this.setState({ token: token })
				} else {
					this.refreshToken(null)
				}
			}
		} catch (e) {
			// maybe TODO - provide fatal error message
		 	 console.log('')
		}
	}
	refreshToken = (token) => {
		if (token) {
		  	localStorage.setItem(AUTH_TOKEN, token)
		} else {
            localStorage.removeItem(AUTH_TOKEN)
            this.props.client.resetStore()
		}
		this.setState({ token })
	}
	render() {
		const { token } = this.state
		return (
			<Fragment>
				{ !token 
				  ?	<LoginPage refreshToken={this.refreshToken} />
				  : <Query query={me} >
							{({ loading, error, data }) => {
								if (loading) return null
								if (error) return `Error!: ${error.message}`
								return (
									<EnquiriesPage refreshToken={this.refreshToken} me={data.me} />
								)
							}}
					</Query> 
				}
			</Fragment>
		)
	}
}

export default Root
