import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  handleUsernameChange,
  handlePasswordChange,
  password,
}) => {
  return (
    <form onSubmit={handleSubmit} style={{ paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '.5rem' }}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          id="username"
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }}>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={handlePasswordChange}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <button type="submit" id="login-btn">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export { LoginForm }
