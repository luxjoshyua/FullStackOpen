import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, username }) => {
	const [visible, setVisible] = useState(false)

	const dispatch = useDispatch()

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			// deleteBlog(blog.id);
			dispatch(removeBlog(blog))
		}
	}

	return (
		<div className="blog">
			<div>
				<span className="title">{blog.title} - </span>
				<span className="author">{blog.author}</span>{' '}
				<button id="view-btn" onClick={toggleVisibility}>
					{visible ? 'hide' : 'show'}
				</button>
			</div>
			{visible && (
				<div className="blog-details">
					<div>{blog.url}</div>
					<div>
						Likes: {blog.likes}{' '}
						<button
							id="like-btn"
							onClick={(event) => {
								event.preventDefault()
								dispatch(likeBlog(blog))
							}}>
							like
						</button>{' '}
					</div>
					<div>{blog.user.name}</div>
					{blog.user.username === username && (
						<button id="delete-btn" onClick={handleDelete}>
							delete
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default Blog
