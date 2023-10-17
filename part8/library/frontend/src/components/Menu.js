import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import LoginForm from './LoginForm'

const Menu = ({ setError, token, setToken, logout }) => {
  // return (
  //   <AppBar position="static">
  //     <Toolbar>
  //       <Button color="inherit" component={Link} to="/">
  //         home
  //       </Button>
  //       <Button color="inherit" component={Link} to="/authors">
  //         authors
  //       </Button>
  //       <Button color="inherit" component={Link} to="/books">
  //         books
  //       </Button>
  //       <Button color="inherit" component={Link} to="/add">
  //         add book
  //       </Button>
  //     </Toolbar>
  //   </AppBar>
  // )

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/authors">
          authors
        </Button>
        <Button color="inherit" component={Link} to="/books">
          books
        </Button>
        {!token ? (
          <>
            <LoginForm setToken={setToken} setError={setError} />
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/add">
              add book
            </Button>
            <Button color="inherit" onClick={logout} to="/">
              logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
