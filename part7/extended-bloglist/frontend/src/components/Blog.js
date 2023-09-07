import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
	// const [visible, setVisible] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	// const toggleVisibility = () => {
	// 	setVisible(!visible)
	// }

	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.user)

	const match = useMatch('/blogs/:id')
	const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
	if (!blog) return null

	console.log(`blog = `, blog)

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(removeBlog(blog))
			navigate('/')
		}
	}

	const Comment = () => {
		if (!blog.comments.length) {
			return (
				<div>
					<span>no comments found for blog</span>
				</div>
			)
		}
		const commentsList = blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
		return <ul>{commentsList}</ul>
	}

	return (
		<div className="blog">
			<div>
				<span className="title" style={{ display: 'block' }}>
					Blog title: {blog.title} -{' '}
				</span>
				<span className="author" style={{ display: 'block' }}>
					Blog author: {blog.author}
				</span>{' '}
			</div>
			<div className="blog-details">
				<div>Blog URL: {blog.url}</div>
				<div>
					Blog likes: {blog.likes}{' '}
					<button
						id="like-btn"
						onClick={(event) => {
							event.preventDefault()
							dispatch(likeBlog(blog))
						}}>
						like
					</button>{' '}
				</div>
				<div style={{ marginBottom: '.5rem' }}>Blog username: {blog.user.name}</div>

				<div>
					<h4 className="comments" style={{ fontSize: '1.5rem', margin: '1rem 0 0 0' }}>
						<strong>Comments</strong>
					</h4>
					<Comment />
				</div>

				{blog.user.username === user.username && (
					<button id="delete-btn" onClick={handleDelete}>
						delete
					</button>
				)}
			</div>
		</div>
	)
}

export default Blog
