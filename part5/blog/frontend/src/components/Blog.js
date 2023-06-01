import { useState } from 'react';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [blogActive, setBlogActive] = useState(false);

  const handleBlogClick = () => {
    setBlogActive(!blogActive);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    });
  };

  const handleDelete = () => {
    if (blog.user.id.toString() === user.id.toString()) {
      return (
        <div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
      );
    }
  };

  return (
    <div style={blogStyle}>
      <div style={{ marginBottom: '.5rem' }}>
        {blog.title} {blog.author}
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
          <div style={{ marginBottom: '.5rem' }}>Blog url: {blog.url}</div>

          <div style={{ marginBottom: '.5rem' }}>
            Blog likes: {blog.likes} <button onClick={handleUpdate}>like</button>
          </div>

          <div style={{ marginBottom: '.5rem' }}>Blog author: {blog.author}</div>

          {handleDelete()}
        </div>
      )}
    </div>
  );
};

export default Blog;
