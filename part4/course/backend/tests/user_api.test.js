// const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

// const User = require('../models/user');

const { setupDBUser } = require('./test_setup');
const { usersInDb } = require('./test_helper');

// only run specific test $ npm test -- -t "creation succeeds with a fresh username"
// only run specific file $ npx jest user_api

const url = '/api/users';

// run all test helper utilities (beforeAll, beforeEach, afterAll)
setupDBUser();

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'trotsky',
      name: 'Leon Trotsky',
      password: 'leon',
    };

    await api
      .post(url)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // verify the state of the database after a user is created
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post(url)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
