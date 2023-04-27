const mongoose = require('mongoose');
const supertest = require('supertest');
require('dotenv').config();
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const { initialBlogs } = require('./test_helper');

const url = '/api/blogs';

// cleanup before each test
beforeEach(async () => {
  // await mongoose.connect(process.env.MONGO_URL);
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
}, 20000);

describe('GET /api/blogs', () => {
  test('correct amount of blog posts are returned', async () => {
    const response = await api.get(url);
    // BREAKING HERE !!!!! - never gets past this point
    console.log('getting here');

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
});

// afterEach(async () => {
//   await mongoose.connection.close();
// });

afterAll(() => {
  mongoose.connection.close();
});
