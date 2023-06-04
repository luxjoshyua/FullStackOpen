const Notification = ({ message, success }) => {
  // if no value in message prop, return
  if (message === null) {
    return null
  }

  return <div className={success === true ? 'success' : 'error'}>{message}</div>
}

export { Notification }
