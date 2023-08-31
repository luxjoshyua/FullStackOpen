import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { logOutUser } from '../reducers/userReducer'

const HeadingBlock = ({ heading, user }) => {
	const dispatch = useDispatch()

	return (
		<div>
			<h1 className="header-title">{heading}</h1>
			<Notification className="notification" />
			<div>
				<p>
					<span className="active-user">User {user.name}</span> logged in{' '}
					<button id="logout-btn" onClick={() => dispatch(logOutUser())}>
						logout
					</button>
				</p>
			</div>
		</div>
	)
}

export default HeadingBlock
