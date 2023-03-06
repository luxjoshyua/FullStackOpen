const Notification = ({ message }) => {
  // if no value in message prop, return
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export { Notification };
