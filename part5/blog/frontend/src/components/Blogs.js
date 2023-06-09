import { useEffect, useRef, useState } from 'react'
import blogService from '../services/blogs'
import { Blog } from './Blog'
import { BlogForm } from './BlogForm'
import { Notification } from './Notification'
import { Togglable } from './Togglable'

const Blogs = ({ user, logout }) => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
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

  // const removeBlog = async (blog) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete title: ${blog.title} by author: ${blog.author}?`
  //     )
  //   ) {
  //     try {
  //       await blogService.remove(blog.id)
  //       setBlogs(await blogService.getAll())
  //     } catch (exception) {
  //       console.log(`error in remove blog function: ${exception}`)
  //     }
  //   }
  // }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService.remove(BlogToDelete.id)
        setSuccessMessage(`Blog ${BlogToDelete.title} was successfully deleted`)
        setBlogs(blogs.filter((blog) => blog.id !== BlogToDelete.id))
        // setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      // setErrorMessage(
      //   `Cannot delete blog ${BlogToDelete.title}`
      // )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '.5rem',
          }}>
          <Togglable buttonLabel="new blog" ref={blogFormRef} id="new-blog-btn">
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <button onClick={logout}>logout</button>
        </div>
        <div style={{ marginBottom: '.5rem' }}>
          <p>user {user.name} logged in</p>
        </div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <p>Please login to view relevant blog posts</p>
      </div>
    )
  }
}

export { Blogs }
