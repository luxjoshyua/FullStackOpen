import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	const users = useSelector((state) => state.users)

	const match = useMatch('/users/:id')
	// const user = match ? users.find((user) => user.id === Number(match.params.id)) : null
	const user = match ? users.find((user) => user.id === match.params.id) : null

	// if (!user) {
	// 	return <div>User not found</div>
	// }

	if (!user) return null

	console.log(user)

	return (
		// do a ternary to check user.blog.length
		<div>
			<h1>{user.name}</h1>
			<h2>added blogs</h2>

			<p>Single user view</p>
		</div>
	)
}

export default User
