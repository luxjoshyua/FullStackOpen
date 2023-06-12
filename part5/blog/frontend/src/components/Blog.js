import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
  const [blogActive, setBlogActive] = useState(false)

  const handleBlogClick = () => {
    setBlogActive(!blogActive)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleUpdate = (event) => {
    event.preventDefault()

    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const removeBlog = () => deleteBlog(blog)

  return (
    <div style={blogStyle} className="blog-container">
      <div style={{ marginBottom: '.5rem', display: 'flex' }}>
        <div className="title" style={{ marginRight: '.25rem' }}>
          blog title: {blog.title}
        </div>
        <div className="author">blog author: {blog.author} </div>
      </div>
      {!blogActive ? (
        <div style={{ marginBottom: '.5rem' }}>
          <button onClick={handleBlogClick} id="view-btn">
            view
          </button>
        </div>
      ) : (
        <div className="blogs">
          <button onClick={handleBlogClick} style={{ marginBottom: '.5rem' }}>
            hide
          </button>
          <div style={{ marginBottom: '.5rem' }}>Blog title: {blog.title}</div>
          <div style={{ marginBottom: '.5rem' }} className="url">
            Blog url: {blog.url}
          </div>
          <div style={{ marginBottom: '.5rem' }} className="likes" id="likes">
            Blog likes: {blog.likes}{' '}
            <button onClick={handleUpdate} id="like-btn">
              like
            </button>
          </div>
          <div style={{ marginBottom: '.5rem' }}>Blog author: {blog.author}</div>
          {userId === blog.user.id ? (
            <button onClick={removeBlog} id="remove-btn">
              remove
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export { Blog }
