import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setNewBlog({ ...newBlog, [name]: value })
	}

	const handleCreateBlog = (event) => {
		event.preventDefault()
		createBlog(newBlog.title, newBlog.author, newBlog.url)
		setNewBlog({ title: '', author: '', url: '' })
	}

	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={handleCreateBlog}>
				<div style={{ marginBottom: '.5rem' }}>
					title
					<input name="title" type="text" value={newBlog.title} onChange={handleInputChange} style={{ marginLeft: '.5rem' }} />
				</div>
				<div style={{ marginBottom: '.5rem' }}>
					author
					<input name="author" type="text" value={newBlog.author} onChange={handleInputChange} style={{ marginLeft: '.5rem' }} />
				</div>
				<div>
					url
					<input name="url" type="text" value={newBlog.url} onChange={handleInputChange} style={{ marginLeft: '.5rem' }} />
				</div>
				<button id="create-blog-btn" type="submit" style={{ margin: '.5rem 0' }}>
					create
				</button>
			</form>
		</div>
	)
}

export default BlogForm
