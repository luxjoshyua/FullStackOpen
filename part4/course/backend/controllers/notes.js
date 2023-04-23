// create a new router object
// https://expressjs.com/en/api.html#router
const notesRouter = require('express').Router();
const Note = require('../models/note');

const loadNote = async (response) => {
  const allNotes = await Note.find({});
  return response.json(allNotes);
};

notesRouter.get('/', async (request, response) => {
  await loadNote(response);
});

// notesRouter.get('/:id', async (request, response, next) => {
//   try {
//     const note = await Note.findById(request.params.id);
//     if (note) {
//       response.json(note);
//     } else {
//       response.status(404).end();
//     }
//   } catch (error) {
//     // pass error on to error handler middleware - if no param given, execute moves onto next route or middleware
//     return next(error);
//   }
// });

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// notesRouter.post('/', async (request, response, next) => {
//   const { content, important } = request.body;
//   const note = new Note({ content, important: important || false });

//   try {
//     const noteToSave = await note.save();
//     // 201 created instead of 200 OK
//     response.status(201).json(noteToSave);
//   } catch (error) {
//     return next(error);
//   }
// });

notesRouter.post('/', async (request, response) => {
  const { content, important } = request.body;
  const note = new Note({ content, important: important || false });

  const noteToSave = await note.save();
  // 201 created instead of 200 OK
  response.status(201).json(noteToSave);
});

// notesRouter.delete('/:id', async (request, response, next) => {
//   try {
//     const noteToDelete = await Note.findByIdAndRemove(request.params.id);
//     if (noteToDelete) {
//       // status code 204 - no content
//       response.status(204).end();
//     } else {
//       response.status(404).end();
//     }
//   } catch (error) {
//     return next(error);
//   }
// });

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

notesRouter.put('/:id', async (request, response, next) => {
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

// module exports the router to be available for all consumers of the model
module.exports = notesRouter;
