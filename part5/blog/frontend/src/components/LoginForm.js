import { Notification } from './Notification';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword, message }) => {
  return (
    <div>
      {message && <Notification className="error" message={message} />}
      <form onSubmit={handleLogin} style={{ paddingBottom: '2rem' }}>
        <h2>log in to application</h2>
        <div style={{ marginBottom: '.5rem' }}>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={{ marginLeft: '.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '.5rem' }}>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ marginLeft: '.25rem' }}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export { LoginForm };
