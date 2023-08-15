import { Container, Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification) return null
  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: '1rem',
  // }

  return (
    <div className="container">
      {notification && <Alert severity="success">{notification}</Alert>}
    </div>
  )

  // return notification && <div style={style}>{notification}</div>
}

export default Notification
