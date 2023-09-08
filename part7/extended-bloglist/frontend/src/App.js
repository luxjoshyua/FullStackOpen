import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import HeadingBlock from './components/HeadingBlock'
import Blog from './components/Blog'
import NotFound from './components/NotFound'
import Menu from './components/Menu'

import { initialiseBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

const App = () => {
	const blogs = useSelector((state) => state.blogs)
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
					<Menu user={user} />
					<HeadingBlock heading="Blogs" user={user} />

					<Routes>
						<Route path="/" element={<BlogList user={user} blogs={blogs} />} />
						<Route path="/blogs/:id" element={<Blog />} />
						<Route path="/blogs" element={<BlogList user={user} blogs={blogs} />} />
						<Route path="/users/:id" element={<User />} />
						<Route path="/users" element={<Users />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			)}
		</Container>
	)
}

export default App
