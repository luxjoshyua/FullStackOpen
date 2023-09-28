import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
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
        <Button color="inherit" component={Link} to="/add">
          add book
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
