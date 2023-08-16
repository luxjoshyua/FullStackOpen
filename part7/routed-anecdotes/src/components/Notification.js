import { Container, Alert } from '@mui/material'

const Notification = ({ notification }) => {
  if (!notification) return null
  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: '1rem',
  // }

  return <Container>{notification && <Alert severity="success">{notification}</Alert>}</Container>

  // return notification && <div style={style}>{notification}</div>
}

export default Notification
