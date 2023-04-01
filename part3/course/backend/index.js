const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
require('dotenv').config();
const Note = require('./models/note');

const errorHandler = (error, request, response, next) => {
  // CastError exception is an invalid object id for Mongo
  if (error.name === 'CastError') {
    // 400 - request can't be understood by the server due to malformed syntax
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  // in all other error cases, pass error forward on to default Express error handler
  next(error);
};

// middleware for catching requests to non-existent routes
// will return an error in JSON format
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
// get everything in json format - should be one of the first middlewares to be loaded into Express
app.use(express.json());
// log with morgan
app.use(morgan('tiny'));
app.use(express.static('build'));

const loadNote = async (response) => {
  const allNotes = await Note.find({});
  return response.json(allNotes);
};

app.get('/api/notes', async (request, response) => {
  // log request.headers to check all the headers of a request
  // console.log(request.headers);
  // response.json(notes);
  await loadNote(response);
});

app.post('/api/notes', async (request, response, next) => {
  try {
    const { content, important } = request.body;
    const note = new Note({ content, important: important || false });
    const noteToSave = await note.save();
    response.json(noteToSave);
  } catch (error) {
    return next(error);
  }
});

app.get('/api/notes/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    // pass error on to error handler middleware - if no param given, execute moves onto next route or middleware
    return next(error);
  }
});

app.delete('/api/notes/:id', async (request, response, next) => {
  try {
    const noteToDelete = await Note.findByIdAndRemove(request.params.id);
    if (noteToDelete) {
      // status code 204 - no content
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    return next(error);
  }
});

app.put('/api/notes/:id', async (request, response, next) => {
  try {
    const { content, important } = request.body;
    // new: true parameter says call event handler with the new modified document instead of the original
    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runvalidators: true, context: 'query' }
    );
    response.json(updatedNote);
  } catch (error) {
    return next(error);
  }
});

app.use(unknownEndpoint);
// handler of requests with results to errors
// has to be the last loaded middleware!
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on https:localhost/${PORT}`);
});
