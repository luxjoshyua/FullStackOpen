// create a new router object
// https://expressjs.com/en/api.html#router
const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// const loadBlog = async (response) => {
//   const allBlogs = await Blog.find({});
//   return response.json(allBlogs);
// };

// GET all blogs - home is localhost:3003/api/blogs , defined in app.js
blogRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({});
  // await loadBlog(response);
  response.json(allBlogs.map((blog) => blog.toJSON()));
});

// POST a new blog
blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({ title, author, url, likes });
  const blogToSave = await blog.save();
  response.status(201).json(blogToSave);
});

// GET a specific blog
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.status(201).json(blog);
  } else {
    response.status(404).end();
  }
});

// DELETE a specific blog
blogRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findByIdAndRemove(request.params.id);
  if (blogToDelete) {
    // status code 204: no content, deletion was successful
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

// PUT a specific blog
blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = { title, author, url, likes };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
});

// module exports the router to be available for all consumers of the model
module.exports = blogRouter;
