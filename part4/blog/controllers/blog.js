// create a new router object
// https://expressjs.com/en/api.html#router
const blogRouter = require('express').Router();
const Blog = require('../models/blog');

const loadBlog = async (response) => {
  const allBlogs = await Blog.find({});
  return response.json(allBlogs);
};

// GET all blogs
blogRouter.get('/', async (request, response) => {
  await loadBlog(response);
});

// POST a new blog
blogRouter.post('/', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    const blog = new Blog({ title, author, url, likes });
    const blogToSave = await blog.save();
    return response.status(201).json(blogToSave);
  } catch (error) {
    return next(error);
  }
});

// GET a specific blog
blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      return response.status(201).json(blog);
    } else {
      return response.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

// DELETE a specific blog
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findByIdAndRemove(request.params.id);
    if (blogToDelete) {
      // status code 204: no content, deletion was successful
      return response.status(204).end();
    } else {
      return response.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

// PUT a specific blog
blogRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    const blog = { title, author, url, likes };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    return response.json(updatedBlog);
  } catch (error) {
    return next(error);
  }
});

// module exports the router to be available for all consumers of the model
module.exports = blogRouter;
