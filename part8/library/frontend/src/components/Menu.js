import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = ({ logout, token }) => {
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

  if (token === null) {
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

          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        </Toolbar>
      </AppBar>
    )
  } else {
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
          <Button color="inherit" onClick={logout} to="/">
            logout
          </Button>
        </Toolbar>
      </AppBar>
    )
  }

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
  //       {token ? (
  //         <>
  //           <Button color="inherit" component={Link} to="/add">
  //             add book
  //           </Button>
  //           <Button color="inherit" onClick={logout} to="/">
  //             logout
  //           </Button>
  //         </>
  //       ) : (
  //         <>
  //           <Button color="inherit" component={Link} to="/login">
  //             login
  //           </Button>
  //         </>
  //       )}
  //     </Toolbar>
  //   </AppBar>
  // )
}

export default Menu
