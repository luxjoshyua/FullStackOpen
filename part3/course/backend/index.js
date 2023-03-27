const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Note = require('./models/note');

// middleware for catching requests to non-existent routes
// will return an error in JSON format
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.log(`Error handler called: ${error.message}`);

  // CastError exception is an invalid object id for Mongo
  if (error.name === 'CastError') {
    // 400 - request can't be understood by the server due to malformed syntax
    return response.status(400).send({ error: 'malformatted id' });
  }

  // in all other error cases, pass error forward on to default Express error handler
  next(error);
};

app.use(express.static('build'));
// get everything in json format - should be one of the first middlewares to be loaded into Express
app.use(express.json());
app.use(cors());
// log with morgan
app.use(morgan('tiny'));
app.use(unknownEndpoint);
// handler of requests with results to errors
// has to be the last loaded middleware
app.use(errorHandler);

let notes = [];

app.get('/', (request, response) => {
  // the request is answered by using the send method of the response object
  // calling the method makes the server respond to the HTTP request by sending a response containing the string 'hello world'
  // that was passed to the `send` method. As it's a string, express automatically sets the value of the Content-Type header
  // to be text/htmt, status code defaults to 200
  response.send('<h1>Hello world!</h1>');
});

const loadNote = async (response) => {
  const allNotes = await Note.find({}).then((notes) => {
    response.json(notes);
  });
  return allNotes;
};

app.get('/api/notes', async (request, response) => {
  // log request.headers to check all the headers of a request
  // console.log(request.headers);
  // response.json(notes);
  await loadNote(response);
});

app.post('/api/notes', async (request, response) => {
  const body = await request.body;

  if (!body.content) {
    // need this return here, otherwise code will keep executing and malformed note will be saved
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  return await note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// app.get('/api/notes/:id', (request, response) => {
//   Note.findById(request.params.id).then((note) => {
//     response.json(note);
//   });
// });

app.get('/api/notes/:id', async (request, response, next) => {
  try {
    const note = await Note.findById({});
    return note ? response.json(note) : response.status(404).end();
  } catch (error) {
    console.log(`Error in api/notes/:id route: ${error}`);
    // pass error on to error handler middleware - if no param given, execute moves onto next route or middleware
    next(error);
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on https:localhost/${PORT}`);
});
