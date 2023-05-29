const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
require('dotenv').config();

const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });

  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const token = request.token;
  const user = request.user;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  if (decodedToken.id !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: 'user id associated with the blog post does not match the sent user' });
  }

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
  const token = request.token;
  const user = request.user;
  const decodedToken = jwt.verify(token, SECRET);
  const id = request.params.id;

  if (!(token || decodedToken.id)) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Note.findById(request.params.id);

  if (blogToDelete.user.toString() === user.id.toString()) {
    // await Blog.findByIdAndRemove(request.params.id);
    await Note.deleteOne({ _id: id });
    response.status(204).end();
  } else {
    return response.status(401).json({
      error: 'user id associated with the blog post does not match the sent user',
    });
  }
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
