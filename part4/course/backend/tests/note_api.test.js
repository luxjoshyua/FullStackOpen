const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
// wrap the app with the supertest function into a superagent object
// https://github.com/ladjs/superagent
const api = supertest(app);

const Note = require('../models/note');

// to run a specific test:
// $ npm test -- -t 'notes are returned as json'

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
];

// clean up the database on each test
beforeEach(async () => {
  await Note.deleteMany({});
  // create a new note object
  let noteObject = new Note(initialNotes[0]);
  // save the note object to the database
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
}, 10000);

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    // check the response status code
    .expect(200)
    // check the header is set to appplication/json i.e. make sure the data is in the desired format
    .expect('Content-Type', /application\/json/);
}, 10000); // change the default timeout of 5 seconds to 10 seconds

// // test that the database has 2 notes
// test('all notes are returned', async () => {
//   // store the response of the request to the response variable
//   const response = await api.get('/api/notes');
//   // execution gets here only after the HTTP request is complete
//   // the result of HTTP request is saved in the variable response
//   expect(response.body).toHaveLength(initialNotes.length);
// });

// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/notes');

//   // used to create an array containing the content of every note returned by the API
//   const contents = response.body.map((r) => r.content);
//   // toContain method is used for checking that the note given to it as a parameter is in the list of notes returned by the API
//   // https://jestjs.io/docs/expect#tocontainitem
//   expect(contents).toContain('Browser can only execute JavaScript');
// });

// close the database connection after all tests have been run
afterAll(async () => {
  await mongoose.connection.close();
});
