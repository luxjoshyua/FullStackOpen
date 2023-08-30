import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, useMatch } from 'react-router-dom'
import { Container } from '@mui/material'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs, createBlog } from './reducers/blogReducer'
import { initializeUser, logOutUser } from './reducers/userReducer'

const App = () => {
	// const blogs = useSelector((state) => [...state.blogs])
	const blogs = useSelector((state) => [...state.blogs].sort((a, b) => b.likes - a.likes)) // spread the state to get object into a new array
	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
		dispatch(initialiseBlogs())
	}, [dispatch])

	const addBlog = async (title, author, url) => {
		try {
			blogFormRef.current.toggleVisibility()
			dispatch(createBlog({ title, author, url, user }))
			dispatch(setNotification(`A new blog title - ${title} - by author - ${author} - added`))
		} catch (exception) {
			dispatch(setNotification(`exception in createBlog ${exception.response.data.error}`, true))
		}
	}

	const blogFormRef = useRef()

	// return (
	// 	<div>
	// 		<h1 className="header-title">Blogs</h1>
	// 		<Notification className="notification" />
	// 		{user === null ? (
	// 			<LoginForm />
	// 		) : (
	// 			<Routes>
	// 				<Route
	// 					path="/"
	// 					element={
	// 						<div>
	// 							<p>
	// 								<span className="active-user">{user.name}</span> logged in{' '}
	// 								<button id="logout-btn" onClick={() => dispatch(logOutUser())}>
	// 									logout
	// 								</button>
	// 							</p>
	// 							<Togglable buttonLabel="new blog" ref={blogFormRef}>
	// 								<BlogForm createBlog={addBlog} />
	// 							</Togglable>
	// 							{blogs.map((blog) => (
	// 								<Blog key={blog.id} blog={blog} username={user.username} />
	// 							))}
	// 						</div>
	// 					}
	// 				/>
	// 			</Routes>
	// 		)}
	// 	</div>
	// )

	return (
		<Container>
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<h1 className="header-title">Blogs</h1>
					<Notification className="notification" />
					<div>
						<p>
							<span className="active-user">User {user.name}</span> logged in{' '}
							<button id="logout-btn" onClick={() => dispatch(logOutUser())}>
								logout
							</button>
						</p>
					</div>
					<Routes>
						<Route
							path="/"
							element={
								<div>
									<Togglable buttonLabel="new blog" ref={blogFormRef}>
										<BlogForm createBlog={addBlog} />
									</Togglable>
									{blogs.map((blog) => (
										<Blog key={blog.id} blog={blog} username={user.username} />
									))}
								</div>
							}
						/>
						<Route path="/users/:id" element={<User />} />
						<Route path="/users" element={<Users />} />
					</Routes>
				</div>
			)}
		</Container>
	)
}

export default App
