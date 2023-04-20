const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

// wrap the app with the supertest function into a superagent object
// https://github.com/ladjs/superagent
const api = supertest(app);

console.log('API', api);

const Note = require('../models/note');

// to run a specific test:
// $ npm test -- -t 'notes are returned as json'

// clean up the database on each test
beforeEach(async () => {
  await Note.deleteMany({});
  // create a new note object
  let noteObject = new Note(helper.initialNotes[0]);
  // save the note object to the database
  await noteObject.save();

  noteObject = new Note(helper.initialNotes[1]);
  await noteObject.save();
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    // check the response status code
    .expect(200)
    // check the header is set to appplication/json i.e. make sure the data is in the desired format
    .expect('Content-Type', /application\/json/);
}, 10000); // change the default timeout of 5 seconds to 10 seconds

// test that the database has 2 notes
test('all notes are returned', async () => {
  // store the response of the request to the response variable
  const response = await api.get('/api/notes');
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in the variable response
  expect(response.body).toHaveLength(helper.initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes');

  // used to create an array containing the content of every note returned by the API
  const contents = response.body.map((r) => r.content);
  // toContain method is used for checking that the note given to it as a parameter is in the list of notes returned by the API
  // https://jestjs.io/docs/expect#tocontainitem
  expect(contents).toContain('Browser can only execute JavaScript');
});

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const notesAtEnd = await helper.notesInDb();
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

  // return an array containing the content of every note returned by the API
  const contents = notesAtEnd.map((n) => n.content);

  expect(contents).toContain('async/await simplifies making async calls');
});

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  // check the state stored in the database after the saving operation, by fetching all of the notes of the application
  const notesAtEnd = await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
});

// close the database connection after all tests have been run
afterAll(async () => {
  await mongoose.connection.close();
});
