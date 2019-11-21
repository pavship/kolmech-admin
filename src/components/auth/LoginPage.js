import React, { useState } from 'react'
import { useMutation } from '../hooks/apolloHooks'
import { login as lQ } from '../../graphql/user'

import styled from 'styled-components'
import { Header, Form, Message, Button, Segment } from 'semantic-ui-react'


const MenuDiv = styled.div`
	border-bottom: 1px solid #7e7e81;
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
		variables: { email, password },
		successMsg: null
		// TODO make sure password isn't cached
		// fetchPolicy: 'no-cache'
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
