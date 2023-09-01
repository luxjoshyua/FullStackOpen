import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/anecdotes">
          anecdotes
        </Button>
        <Button color="inherit" component={Link} to="/create">
          create new
        </Button>
        <Button color="inherit" component={Link} to="/about">
          about
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
