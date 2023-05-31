const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
require('dotenv').config();

// create a new router object
// https://expressjs.com/en/api.html#router
const blogRouter = require('express').Router();
const Blog = require('../models/blog');

// GET all blogs - home is localhost:3003/api/blogs , defined in app.js
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.status(200).json(blogs);
});

// POST a new blog
blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;
  if (!title || !url) {
    return response.status(400).json({ error: 'title or url missing' }).end();
  }

  const token = request.token;
  const user = request.user;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (decodedToken.id !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: 'user id associated with the blog post does not match the sent user' });
  }

  const blog = new Blog({ title, author, url, likes, user: user.id });

  const blogToSave = await blog.save();

  // concat merges two or more arrays into new array
  // store the note id in the user document
  user.blogs = user.blogs.concat(blogToSave._id);
  await user.save();

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
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, SECRET);
  const id = request.params.id;

  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);

  if (blogToDelete.user.toString() === user.id.toString()) {
    // await Blog.findByIdAndRemove(request.params.id);
    await Blog.deleteOne({ _id: id });
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: 'user id associated with the blog post does not match the sent user',
    });
  }
});

// PUT a specific blog
// blogRouter.put('/:id', async (request, response) => {
//   const { title, author, url, likes } = request.body;
//   const blog = { title, author, url, likes };
//   const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
//   response.json(updatedBlog);
// });

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  // const token = request.token;
  // const user = request.user;

  // const decodedToken = jwt.verify(token, process.env.SECRET);

  // if (!(token || decodedToken.id)) {
  //   return response.status(401).json({ error: 'token missing or invalid' });
  // }

  // if (!user) {
  //   return response.status(401).json({ error: 'user not found' });
  // }

  const blog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  response.json(updatedBlog);
});

// module exports the router to be available for all consumers of the model
module.exports = blogRouter;
