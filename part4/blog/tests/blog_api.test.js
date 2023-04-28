// const mongoose = require('mongoose');
const supertest = require('supertest');
require('dotenv').config();
const { setupDB } = require('./test_setup.js');
const app = require('../app');
const api = supertest(app);

const { initialBlogs } = require('./test_helper');

const url = '/api/blogs';

// run all test helper utilities (beforeAll, beforeEach, afterAll)
setupDB();

describe('GET /api/blogs', () => {
  it('should return correct amount of blog posts', async () => {
    const response = await api.get(url);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  // test('blogs are returned as json', async () => {
  //   await api
  //     .get('/api/blogs')
  //     .expect(200)
  //     .expect('Content-Type', /application\/json/);
  // });
});
