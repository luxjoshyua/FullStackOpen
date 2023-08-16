const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// post request to api/testing/reset endpoint empites the database
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
