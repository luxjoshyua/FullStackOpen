import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../reducers/userReducer'

const Menu = ({ user }) => {
	const dispatch = useDispatch()

	return (
		<AppBar position="static">
			<Toolbar>
				<Button color="inherit" component={Link} to="/">
					home
				</Button>
				<Button color="inherit" component={Link} to="/blogs">
					blogs
				</Button>
				<Button color="inherit" component={Link} to="/users">
					users
				</Button>
				<div>
					<span className="active-user">
						User <strong>{user.name}</strong>
					</span>{' '}
					logged in{' '}
					<button id="logout-btn" onClick={() => dispatch(logOutUser())}>
						logout
					</button>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Menu
