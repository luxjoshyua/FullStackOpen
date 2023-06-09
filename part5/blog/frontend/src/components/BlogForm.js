import { useState } from 'react'
import { Notification } from './Notification'

const BlogForm = ({ createBlog, successMessage }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: blogLikes,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    setBlogLikes(0)
  }

  return (
    <form onSubmit={addBlog} style={{ marginBottom: '.5rem' }}>
      {successMessage && <Notification message={successMessage} success={true} />}
      <div style={{ marginBottom: '.5rem' }} className="title">
        title
        <input
          type="text"
          id="title"
          value={blogTitle}
          name="blog title"
          onChange={(event) => setBlogTitle(event.target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }} className="author">
        author
        <input
          type="text"
          id="author"
          value={blogAuthor}
          name="blog author"
          onChange={(event) => setBlogAuthor(event.target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }} className="url">
        url
        <input
          type="text"
          id="url"
          value={blogUrl}
          name="blog url"
          onChange={(event) => setBlogUrl(event.target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }} className="likes">
        likes
        <input
          type="number"
          id="likes"
          value={blogLikes}
          name="blog likes"
          onChange={(event) => setBlogLikes(event.target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <button type="submit" id="create-btn">
        create
      </button>
    </form>
  )
}

export { BlogForm }
