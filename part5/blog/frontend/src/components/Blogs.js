import { useEffect, useRef, useState } from 'react'
import blogService from '../services/blogs'
import { Blog } from './Blog'
import { BlogForm } from './BlogForm'
import { Notification } from './Notification'
import { Togglable } from './Togglable'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      // let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      // setBlogs(sortedBlogs);
      setBlogs(blogs)
    })
  }, [])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(`error in add blog function: ${exception}`)
    }
  }

  const removeBlog = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete title: ${blog.title} by author: ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog.id)
        setBlogs(await blogService.getAll())
      } catch (exception) {
        console.log(`error in remove blog function: ${exception}`)
      }
    }
  }

  const updateBlog = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog)))
    })
  }

  if (user) {
    return (
      <div>
        {successMessage && (
          <Notification className="success" message={successMessage} success={true} />
        )}
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <h2>Blogs</h2>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    )
  }
}

export { Blogs }
