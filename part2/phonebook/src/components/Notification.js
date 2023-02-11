const Notification = ({ message }) => {
  // if no value in message prop, return
  if (message === null) {
    return null;
  }

  return (
    <div
      style={{
        fontSize: '2rem',
        color: 'green',
        textDecoration: 'underline',
        border: '2px dotted blue',
        marginBottom: '1.5rem',
      }}>
      {message}
    </div>
  );
};

export { Notification };
