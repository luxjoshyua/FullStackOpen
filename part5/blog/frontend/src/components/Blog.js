const Blog = ({ blog }) => (
  <div style={{ marginBottom: '.5rem' }}>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
