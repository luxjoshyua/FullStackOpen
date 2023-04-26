const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'My new title awesome blog post.',
    author: 'John Smith',
    url: 'http://example.com/2',
    likes: 5,
  },
  {
    title: 'My second awesome blog post.',
    author: 'Bill Hayder',
    url: 'http://bill-hayder.com',
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
};
