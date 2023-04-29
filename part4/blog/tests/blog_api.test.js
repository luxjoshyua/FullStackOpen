const mongoose = require('mongoose');
const supertest = require('supertest');
require('dotenv').config();
// const { setupDB } = require('./test_setup.js');
const Blog = require('../models/blog');
const app = require('../app');
const api = supertest(app);

const { initialBlogs } = require('./test_helper');

const url = '/api/blogs';

// MAKE SURE YOU ARE USING CORRECT NODE VERSION INSTEAD OF SYSTEM DEFAULT - 18.12.1

// only run specific test $ npm test -- -t "should return blogs as json"

// only run specific file $ npx jest blog_api.test.js

// run all test helper utilities (beforeAll, beforeEach, afterAll)
// setupDB();

describe('GET /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

  it('should return correct amount of blog posts', async () => {
    const response = await api.get(url);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  it('should return blogs as json', async () => {
    await api
      .get(url)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should return the unique identifier for each blog as id, not default _id', async () => {
    const response = await api.get(url);
    const id = response.body.map((r) => r.id);
    expect(id).toBeDefined();
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
