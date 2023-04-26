const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
// const helper = require('./test_helper');
const { initialBlogs } = require('./test_helper');

// cleanup
beforeEach(async () => {
  await Blog.deleteMany({});
});

test('correct amount of blog posts are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
