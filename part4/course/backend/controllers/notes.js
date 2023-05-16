const jwt = require('jsonwebtoken');
require('dotenv').config();

const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });

  response.json(notes);
});

// helper function isolates the token from the authorization header
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '');
  }
  return null;
};

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  // const user = await User.findById(body.userId);

  // the validity of the token is checked with jwt.verify
  // method also decodes the token, or returns the Object which the token was based on
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  // if the object decoded from the token does not contain the user's identity
  // (decodedToken.id is undefined), error status code 401 returned, reason
  // is explained in the response body
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  // the identity of the maker of the request is resolved, execution continues as before
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id,
  });

  const savedNote = await note.save();
  // concat merges two or more arrays into new array
  // store the note id in the user document
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body;

  const note = {
    content: content,
    important: important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
  return response.json(updatedNote);
});

module.exports = notesRouter;
