import React, { useState } from 'react'

import styled from 'styled-components'
import { Header, Form, Message, Button, Segment } from 'semantic-ui-react'

import { login as lQ } from '../graphql/user'
import { useMutation } from './hooks/apolloHooks'

const MenuDiv = styled.div`
	border-bottom: 1px solid #7e7e81;
	// height: 35px;
`

const MenuHeader = styled(Header)`
	display: inline;
	padding: 0 1rem !important;
`

const SSegment = styled(Segment)`
	max-width: 350px !important;
	margin: auto !important;
`

export default function LoginPage ({ refreshToken }) {
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ login, { loading, error } ] = useMutation(lQ, {
		variables: { email, password }
	})
	return <>
		<MenuDiv>
			<MenuHeader size='large'>
				<i>Колмех</i>
			</MenuHeader>
		</MenuDiv>
		<SSegment basic>
			<Form error={!!error}>
				<Form.Field>
					<label>E-mail</label>
					<input 
						type="email" 
						placeholder='E-mail'
						onChange={({ target: { value }}) => setEmail(value)} />
				</Form.Field>
				<Form.Field>
					<label>Пароль</label>
					<input 
						type="password" 
						placeholder='Пароль'
						onChange={({ target: { value }}) => setPassword(value)} />
				</Form.Field>
				<Message
					error
					header='Войти не удалось..'
					content={error} />
				<Button 
					primary
					type='submit'
					floated='right'
					disabled={!email || !password || loading}
					loading={loading}
					onClick={async () => {
						const res = await login()
						refreshToken(res.data.login.token)
					}}
				>
					Войти
				</Button>
			</Form>
		</SSegment>
	</>
}

// class LoginPage extends Component {
// 	state = {
// 		email: '',
// 		password: '',
// 		sendingRequest: false,
// 		error: ''
// 	}
// 	handleInputChange = (attr) => {
// 		this.setState({ [attr]: this[attr].value })
// 	}
// 	submit = async () => {
// 		try {
// 			const { email, password } = this.state
// 			this.setState({ sendingRequest: true })
// 			const result = await this.props.login({
// 				variables: {
// 					email,
// 					password
// 				}
// 			})
// 			const token = result.data.login.token
// 			this.setState({ sendingRequest: false })
// 			this.props.refreshToken(token)
// 		} catch (err) {
// 			this.setState({ error: err.message, sendingRequest: false })
// 		}
// 	}
// 	render() {
// 		const { email, password, sendingRequest, error } = this.state
// 		return (
// 			<Fragment>
// 				<MenuDiv>
// 					<MenuHeader size='large'>
// 						<i>Колмех</i>
// 					</MenuHeader>
// 				</MenuDiv>
// 				<SSegment basic>
// 					<Form error={!!error}>
// 						<Form.Field>
// 							<label>E-mail</label>
// 							<input 
// 								type="email" 
// 								placeholder='E-mail'
// 								ref={ref => this.email = ref} 
// 								onChange={() => this.handleInputChange('email')} />
// 						</Form.Field>
// 						<Form.Field>
// 							<label>Пароль</label>
// 							<input 
// 								type="password" 
// 								placeholder='Пароль'
// 								ref={ref => this.password = ref} 
// 								onChange={() => this.handleInputChange('password')} />
// 						</Form.Field>
// 						<Message
// 							error
// 							header='Войти не удалось..'
// 							content={error} />
// 						<Button 
// 							primary
// 							type='submit'
// 							floated='right'
// 							disabled={!email || !password || sendingRequest}
// 							loading={sendingRequest}
// 							onClick={this.submit} >
// 							Войти
// 						</Button>
// 					</Form>
// 				</SSegment>
// 			</Fragment>
// 		)
// 	}
// }

// export default compose(
// 	graphql(login, {
// 		name: 'login',
// 		options: {
// 			fetchPolicy: 'no-cache'
// 		}
// 	})
// )(LoginPage)