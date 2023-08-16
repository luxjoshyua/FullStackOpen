import PropTypes from 'prop-types';
import { Notification } from './Notification';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, message }) => {
	return (
		<div>
			{message && <Notification className="error" message={message} />}
			<form onSubmit={handleLogin} style={{ paddingBottom: '2rem' }}>
				<h2>log in to application</h2>
				<div style={{ marginBottom: '.5rem' }}>
					username
					<input type="text" value={username} name="username" id="username" onChange={({ target }) => setUsername(target.value)} style={{ marginLeft: '.25rem' }} />
				</div>
				<div style={{ marginBottom: '.5rem' }}>
					password
					<input type="password" value={password} name="password" id="password" onChange={({ target }) => setPassword(target.value)} style={{ marginLeft: '.25rem' }} />
				</div>
				<button type="submit" id="submit-btn">
					login
				</button>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	message: PropTypes.string
};

export { LoginForm };
