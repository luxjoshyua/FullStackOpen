import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'

const LoginForm = ({ setError, setToken }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message)
		}
	})

	useEffect(() => {
		if (result.data) {
			// save the token's value to the state of the App component and the local storage after the server has responded to the mutation
			// useEffect hook prevents endless rendering loop
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('phonenumbers-user-token', token)
		}
	}, [result.data, setToken])

	const submit = async (event) => {
		event.preventDefault()

		login({ variables: { username, password } })
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					username{' '}
					<input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password{' '}
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm
