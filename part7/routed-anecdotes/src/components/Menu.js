import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
  // const padding = {
  //   paddingRight: 5,
  // }
  // return (
  //   <div>
  //     <Link to="/" style={padding}>
  //       home
  //     </Link>
  //     <Link to="/anecdotes" style={padding}>
  //       anecdotes
  //     </Link>
  //     <Link to="/create" style={padding}>
  //       create new
  //     </Link>
  //     <Link to="/about" style={padding}>
  //       about
  //     </Link>
  //   </div>
  // )
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
