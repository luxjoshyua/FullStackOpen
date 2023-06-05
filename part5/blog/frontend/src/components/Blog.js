import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
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

  // as soon as the blog component remounts, it loses the data about the user who created the blog
  const handleDelete = () => {
    // if (blog.user.id === undefined || user.id === undefined) {
    //   return null
    // } else if (blog.user.id.toString() === user.id.toString()) {
    //   return (
    //     <div>
    //       <button onClick={() => removeBlog(blog)}>remove</button>
    //     </div>
    //   )
    // }

    // if (!(blog || user)) {
    //   return null
    // } else if (blog.user.id.toString() === user.id.toString()) {
    //   return (
    //     <div>
    //       <button onClick={() => removeBlog(blog)}>remove</button>
    //     </div>
    //   )
    // }

    if (!(blog || user)) {
      return null
    } else {
      return (
        <div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      )
    }

    // return null
  }

  // console.log(blog)

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
          <button onClick={handleBlogClick}>view</button>
        </div>
      ) : (
        <div>
          <button onClick={handleBlogClick} style={{ marginBottom: '.5rem' }}>
            hide
          </button>
          <div style={{ marginBottom: '.5rem' }}>Blog title: {blog.title}</div>
          <div style={{ marginBottom: '.5rem' }} className="url">
            Blog url: {blog.url}
          </div>
          <div style={{ marginBottom: '.5rem' }} className="likes">
            Blog likes: {blog.likes}{' '}
            <button onClick={handleUpdate} id="like-btn">
              like
            </button>
          </div>
          <div style={{ marginBottom: '.5rem' }}>Blog author: {blog.author}</div>
          {handleDelete()}
        </div>
      )}
    </div>
  )
}

export { Blog }
