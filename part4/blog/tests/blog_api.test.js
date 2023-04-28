const mongoose = require('mongoose');
const supertest = require('supertest');
require('dotenv').config();
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const { initialBlogs } = require('./test_helper');

const url = '/api/blogs';

beforeAll(async () => {
  console.log('entered db connection phase');
  await mongoose.connect(process.env.MONGO_URL);
  console.log('connected !');
});

// cleanup before each test
beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('cleared');

  // const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blog) => blog.save());
  // await Promise.all(promiseArray);

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
    console.log('saved');
  }

  // initialBlogs.forEach(async (blog) => {
  //   let blogObject = new Blog(blog);
  //   await blogObject.save();
  //   console.log('saved');
  // });
  console.log('done');

  // await Blog.insertMany(initialBlogs);
});

test('should return correct amount of blog posts', async () => {
  console.log('entered test');
  const response = await api.get(url);

  expect(response.body).toHaveLength(initialBlogs.length);
});

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

// describe('GET /api/blogs', () => {
//   // jest.useFakeTimers('legacy');

//   console.log('entered test');
//   it('should return correct amount of blog posts', async () => {
//     const response = await api.get(url);

//     expect(response.body).toHaveLength(initialBlogs.length);
//   });

//   // test('blogs are returned as json', async () => {
//   //   await api
//   //     .get('/api/blogs')
//   //     .expect(200)
//   //     .expect('Content-Type', /application\/json/);
//   // });
// });

// afterEach(() => {
//   jest.useRealTimers();
// });

afterAll(async () => {
  await mongoose.connection.close();
});
