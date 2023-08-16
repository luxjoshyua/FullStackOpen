const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('../utils/config')
require('dotenv').config()
const { info } = require('../utils/logger')

// create a new router object
// https://expressjs.com/en/api.html#router
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// GET all blogs - home is localhost:3003/api/blogs , defined in app.js
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

// POST a new blog
blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const token = request.token

  const decodedToken = jwt.verify(token, SECRET)

  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // console.log(`first decodedToken`, decodedToken)

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'authenticated user not found' })
  }

  // console.log(`USER`, user)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id, // this breaks
  })

  // console.log(`BLOG`, blog)

  try {
    const blogToSave = await blog.save()
    info(`blog saved to database: ${blogToSave.title} by ${blogToSave.author}`)
    // concat merges two or more arrays into new array
    // store the note id in the user document
    user.blogs = user.blogs.concat(blogToSave._id)
    await user.save()
    info(`blog attached to user ${user.username}`)
    response.status(201).json(blogToSave)
  } catch (error) {
    response.status(400).json(error)
  }
})

// GET a specific blog
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.status(201).json(blog)
  } else {
    response.status(404).end()
  }
})

// DELETE a specific blog
// blogRouter.delete('/:id', async (request, response) => {
//   const token = request.token
//   const decodedToken = jwt.verify(token, SECRET)

//   const user = await User.findById(decodedToken.id)

//   const blogToDelete = await Blog.findById(request.params.id) // THIS IS NULL

//   console.log(`BLOG TO DELETE`, blogToDelete)

//   if (blogToDelete.user._id.toString() === user._id.toString()) {
//     try {
//       await Blog.findByIdAndRemove(request.params.id)
//       response.status(204).end()
//     } catch (exception) {
//       next(exception)
//     }
//   } else {
//     return response.status(401).json({ error: `Unauthorized` })
//   }
// })

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)

  console.log(`BLOG DELETE`, blog)

  if (!blog.user) {
    return response.status(401).json({ error: 'No such user exists' })
  }

  const tokenUserId = request.user.id

  if (blog.user.toString() !== tokenUserId.toString()) {
    return response.status(401).json({ error: 'Deleting only possible by the creator' })
  }
  console.log('deleting')
  const deletedBlog = await Blog.findByIdAndRemove(id)
  if (!deletedBlog) {
    return response.status(400).end()
  }
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

// module exports the router to be available for all consumers of the model
module.exports = blogRouter
