import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs, createBlog } from './reducers/blogReducer'
import { initializeUser, logOutUser } from './reducers/userReducer'

const App = () => {
	// need to sort the blogs here
	const blogs = useSelector((state) => [...state.blogs]) // spread the state to get object into a new array
	const user = useSelector((state) => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
		dispatch(initialiseBlogs())
	}, [dispatch])

	const addBlog = async (title, author, url) => {
		try {
			blogFormRef.current.toggleVisibility()
			dispatch(createBlog({ title, author, url, user }))
			dispatch(setNotification(`A new blog tile: ${title} by author: ${author} added`))
		} catch (exception) {
			dispatch(setNotification(`exception in createBlog ${exception.response.data.error}`, true))
		}
	}

	const blogFormRef = useRef()

	return (
		<div>
			<h1 className="header-title">Blogs</h1>
			<Notification className="notification" />
			{user === null ? (
				<LoginForm />
			) : (
				<div>
					<p>
						<span className="active-user">{user.name}</span> logged in{' '}
						<button id="logout-btn" onClick={() => dispatch(logOutUser())}>
							logout
						</button>
					</p>
					<Togglable buttonLabel="new blog" ref={blogFormRef}>
						<BlogForm createBlog={addBlog} />
					</Togglable>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog key={blog.id} blog={blog} username={user.username} />
						))}
				</div>
			)}
		</div>
	)
}

export default App
