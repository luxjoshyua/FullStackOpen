import { useLocation, Link } from 'react-router-dom'

const NotFound = () => {
	let location = useLocation()

	return (
		<div>
			<h2>
				Oh no, page <code>{location.pathname}</code> wasn't found !
			</h2>
			<Link to="/">
				<p>return home</p>
			</Link>
		</div>
	)
}

export default NotFound
