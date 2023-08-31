import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import HeadingBlock from './components/HeadingBlock'

import { initialiseBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
	// const blogs = useSelector((state) => [...state.blogs])
	const blogs = useSelector((state) => [...state.blogs].sort((a, b) => b.likes - a.likes)) // spread the state to get object into a new array
	const user = useSelector((state) => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
		dispatch(initialiseBlogs())
	}, [dispatch])

	return (
		<Container>
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<HeadingBlock heading="Blogs" user={user} />
					<Routes>
						<Route path="/" element={<BlogList user={user} blogs={blogs} />} />
						<Route path="/users/:id" element={<User />} />
						<Route path="/users" element={<Users />} />
					</Routes>
				</div>
			)}
		</Container>
	)
}

export default App
