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
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }}>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export { LoginForm };
