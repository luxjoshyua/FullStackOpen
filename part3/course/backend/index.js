const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const Note = require('./models/note');

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

// let notes = [];

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
  const body = request.body;

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
    console.log(`Saved note: ${savedNote}`);
    response.json(savedNote);
  });
});

// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => next(error));
// });

app.get('/api/notes/:id', async (request, response, next) => {
  try {
    console.log(request.params.id);

    const note = await Note.findById(request.params.id);
    // console.log(`Note: ${note}`);

    // if note exists, return it, otherwise return 404
    return note ? response.json(note) : response.status(404).end();
  } catch (error) {
    console.log(`Error in api/notes/:id route: ${error}`);
    // pass error on to error handler middleware - if no param given, execute moves onto next route or middleware
    next(error);
  }
});

// app.delete('/api/notes/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//   .then((result) => {
//     console.log(`Delete result: ${result}`);
//     response.status(204).end()
//   })
//   .catch(error => {
//     next(error)
//   })
// });

app.delete('/api/notes/:id', async (request, response, next) => {
  try {
    const result = await Note.findByIdAndRemove(request.params.id);
    console.log(`Delete result: ${result}`);
    // status code 204 - no content
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// app.put('/api/notes/:id', (request, response, next) => {
//   const body = request.body

//   const note = {
//     content: body.content,
//     important: body.important,
//   }

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

app.put('/api/notes/:id', async (request, response, next) => {
  try {
    const body = request.body;
    const note = {
      content: body.content,
      important: body.important,
    };
    // new: true parameter says call event handler with the new modified document instead of the original
    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
    response.json(updatedNote);
  } catch (error) {
    next(error);
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
