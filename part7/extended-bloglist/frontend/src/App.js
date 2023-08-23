import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs } from './reducers/blogReducer'

const App = () => {
	// const [blogs, setBlogs] = useState([])
	// const [message, setMessage] = useState(null)
	const blogs = useSelector((state) => [...state.blogs]) // spread the state to get object into a new array

	const [user, setUser] = useState(null)

	const dispatch = useDispatch()

	// useEffect(() => {
	// 	blogService.getAll().then((blogs) => setBlogs(blogs))
	// }, [])

	useEffect(() => {
		// initialiseUser here too
		dispatch(initialiseBlogs())
	}, [dispatch])

	// Clear notification after 5 seconds
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setMessage(null)
	// 	}, 5000)
	// 	return () => {
	// 		clearTimeout(timer)
	// 	}
	// }, [message])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({
				username,
				password
			})
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
		} catch (exception) {
			dispatch(setNotification(`exception in handleLogin ${exception.response.data.error}`, true))
		}
	}

	const handleLogout = () => {
		window.localStorage.clear()
		setUser(null)
	}

	const createBlog = async (title, author, url) => {
		try {
			blogFormRef.current.toggleVisibility()
			const blog = await blogService.create({
				title,
				author,
				url
			})
			// setBlogs(blogs.concat(blog))
			dispatch(setNotification(`A new blog tile: ${title} by author: ${author} added`))
		} catch (exception) {
			dispatch(setNotification(`exception in createBlog ${exception.response.data.error}`, true))
		}
	}

	const updateLikes = async (id, blogToUpdate) => {
		try {
			const updatedBlog = await blogService.update(id, blogToUpdate)
			const newBlogs = blogs.map((blog) => (blog.id === id ? updatedBlog : blog))
			// setBlogs(newBlogs)
		} catch (exception) {
			dispatch(`exception in updateLikes ${exception.response.data.error}`, true)
		}
	}

	const deleteBlog = async (blogId) => {
		try {
			await blogService.remove(blogId)
			const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
			// setBlogs(updatedBlogs)
		} catch (exception) {
			dispatch(`exception in deleteBlog' ${exception.response.data.error}`, true)
		}
	}

	const blogFormRef = useRef()

	return (
		<div>
			<h1 className="header-title">Blogs</h1>
			<Notification className="notification" />
			{user === null ? (
				<LoginForm handleLogin={handleLogin} />
			) : (
				<div>
					<p>
						<span className="active-user">{user.name}</span> logged in{' '}
						<button id="logout-btn" onClick={handleLogout}>
							logout
						</button>
					</p>
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm createBlog={createBlog} />
					</Togglable>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} username={user.username} />
						))}
					{/* {blogs.map((blog) => (
						<div>{blog}</div>
					))} */}
				</div>
			)}
		</div>
	)
}

export default App
