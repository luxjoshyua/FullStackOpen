const jwt = require('jsonwebtoken');
require('dotenv').config();

// create a new router object
// https://expressjs.com/en/api.html#router
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// helper function isolates the token from the authorization header
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '');
  }
  return null;
};

// GET all blogs - home is localhost:3003/api/blogs , defined in app.js
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.status(200).json(blogs);
});

// POST a new blog
blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  // the validity of the token is checked with jwt.verify
  // method also decodes the token, or returns the Object which the token was based on
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  // if the object decoded from the token does not contain the user's identity
  // (decodedToken.id is undefined), error status code 401 returned,
  // reason is explained in the response body
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  // the identity of the maker of the request is resolved, execution continues as before
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ title, author, url, likes, user: user.id });

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
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
