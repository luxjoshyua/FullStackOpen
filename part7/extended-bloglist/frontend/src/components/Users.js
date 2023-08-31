import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
	const users = useSelector((state) => state.users)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [dispatch])

	return (
		<div>
			<h2>Users</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>
									<Link to={`/users/${user.id}`}>
										<span>
											<strong>User name:</strong> {user.name}
										</span>
									</Link>
								</TableCell>
								<TableCell>
									<span>
										<strong>Blogs created:</strong> {user.blogs.length}
									</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users
