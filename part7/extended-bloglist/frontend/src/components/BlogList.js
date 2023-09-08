import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = ({ user, blogs }) => {
	const blogFormRef = useRef()
	const dispatch = useDispatch()

	const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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
			{sortedBlogs.map((blog) => (
				<div key={blog.id} style={{ border: '1px solid black', marginBottom: '1rem', padding: '1rem' }}>
					<Link to={`/blogs/${blog.id}`}>
						<span>
							<strong>{blog.title}</strong>
						</span>
					</Link>
				</div>
			))}
		</div>
	)
}

export default BlogList
