const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });

  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

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
