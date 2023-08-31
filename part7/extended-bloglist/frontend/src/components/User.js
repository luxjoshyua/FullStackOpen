import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
	const users = useSelector((state) => state.users)

	const match = useMatch('/users/:id')
	const user = match ? users.find((user) => user.id === match.params.id) : null

	if (!user) return null

	if (user.blogs.length === 0) {
		return (
			<div>
				<h1>{user.name}</h1>
				<p>user hasn't entered any blogs yet</p>
			</div>
		)
	} else {
		return (
			<div>
				<h1>{user.name}</h1>
				<h2>added blogs</h2>
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
				</ul>
			</div>
		)
	}
}

export default User
