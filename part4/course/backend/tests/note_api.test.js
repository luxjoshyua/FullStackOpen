const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

// wrap the app with the supertest function into a superagent object
// https://github.com/ladjs/superagent
const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    // check the response status code
    .expect(200)
    // check the header is set to appplication/json i.e. make sure the data is in the desired format
    .expect('Content-Type', /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});
