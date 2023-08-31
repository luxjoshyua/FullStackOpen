import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
	// const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()

	// const toggleVisibility = () => {
	// 	setVisible(!visible)
	// }

	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)

	const match = useMatch('/blogs/:id')
	const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

	if (!blog) return null

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(removeBlog(blog))
		}
	}

	return (
		<div className="blog">
			<div>
				<span className="title">{blog.title} - </span>
				<span className="author">{blog.author}</span>{' '}
			</div>
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
				{blog.user.username === user.username && (
					<button id="delete-btn" onClick={handleDelete}>
						delete
					</button>
				)}
			</div>
		</div>
	)

	// return (
	// 	<div className="blog">
	// 		<div>
	// 			<span className="title">{blog.title} - </span>
	// 			<span className="author">{blog.author}</span>{' '}
	// 			<button id="view-btn" onClick={toggleVisibility}>
	// 				{visible ? 'hide' : 'show'}
	// 			</button>
	// 		</div>
	// 		{visible && (
	// 			<div className="blog-details">
	// 				<div>{blog.url}</div>
	// 				<div>
	// 					Likes: {blog.likes}{' '}
	// 					<button
	// 						id="like-btn"
	// 						onClick={(event) => {
	// 							event.preventDefault()
	// 							dispatch(likeBlog(blog))
	// 						}}>
	// 						like
	// 					</button>{' '}
	// 				</div>
	// 				<div>{blog.user.name}</div>
	// 				{blog.user.username === username && (
	// 					<button id="delete-btn" onClick={handleDelete}>
	// 						delete
	// 					</button>
	// 				)}
	// 			</div>
	// 		)}
	// 	</div>
	// )
}

export default Blog
