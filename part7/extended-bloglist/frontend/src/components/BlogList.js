import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = ({ user, blogs }) => {
	const blogFormRef = useRef()

	const dispatch = useDispatch()

	const addBlog = async (title, author, url) => {
		try {
			blogFormRef.current.toggleVisibility()
			dispatch(createBlog({ title, author, url, user }))
			dispatch(setNotification(`A new blog title - ${title} - by author - ${author} - added`))
		} catch (exception) {
			dispatch(setNotification(`exception in createBlog ${exception.response.data.error}`, true))
		}
	}

	return (
		<div>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} username={user.username} />
			))}
		</div>
	)
}

export default BlogList
