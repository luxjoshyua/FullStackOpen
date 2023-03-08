const Notification = ({ message, success, errorMsg, error }) => {
  // if no value in message prop, return
  if (message === null || errorMsg === null) {
    return null;
  }

  if (error) {
    return (
      <div
        style={{
          fontSize: '2rem',
          color: 'white',
          marginBottom: '1.5rem',
          background: 'red',
          fontStyle: 'italic',
        }}>
        <p>{errorMsg}</p>
      </div>
    );
  }

  if (success) {
    return (
      <div
        style={{
          fontSize: '2rem',
          color: 'white',
          textDecoration: 'underline',
          background: 'green',
          marginBottom: '1.5rem',
        }}>
        {message.length > 0 && <p>{message}</p>}
      </div>
    );
  }
};

export { Notification };
