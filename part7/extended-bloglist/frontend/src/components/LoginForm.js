import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../reducers/userReducer'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const onSubmit = (event) => {
		event.preventDefault()
		dispatch(logInUser(username, password))
		setUsername('')
		setPassword('')
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={onSubmit}>
				<div>
					username
					<input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
				</div>
				<div>
					password
					<input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
				</div>
				<button id="login-btn" type="submit">
					login
				</button>
			</form>
		</div>
	)
}

export default LoginForm
