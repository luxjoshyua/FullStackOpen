const mongoose = require('mongoose');
const supertest = require('supertest');
require('dotenv').config();
const { setupDB } = require('./test_setup.js');
const Blog = require('../models/blog');
const app = require('../app');
const api = supertest(app);

const { initialBlogs, blogsInDB } = require('./test_helper');

const url = '/api/blogs';

// MAKE SURE YOU ARE USING CORRECT NODE VERSION INSTEAD OF SYSTEM DEFAULT - 18.12.1

// only run specific test $ npm test -- -t "should return blogs as json"

// only run specific file $ npx jest blog_api.test.js

// run all test helper utilities (beforeAll, beforeEach, afterAll)
setupDB();

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

  it('should create a new blog post when sending a HTTP post request to /api/blogs, verify by checking that the total number of blogs in the system is increased by one', async () => {
    const newBlog = {
      title: 'My third awesome blog post.',
      author: 'Rosa Luxemburg',
      url: 'http://rosa.com',
      likes: 8,
    };

    await api
      .post(url)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDB();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  });

  it('should default to 0 likes if likes property is missing from request', async () => {
    const newBlog = {
      title: 'My third awesome blog post.',
      author: 'Rosa Luxemburg',
      url: 'http://rosa.com',
    };

    await api
      .post(url)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDB();

    const likes = blogsAtEnd.map((blog) => blog.likes);
    expect(likes).toContain(0);
  });

  it('should return 400 Bad Request if title and url properties are missing from request', async () => {
    const newBlog = {
      author: 'Rosa Luxemburg',
    };
    await api.post(url).send(newBlog).expect(400);
    const blogsAtEnd = await blogsInDB();
    // check the length of the array is the same as the initial array
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
