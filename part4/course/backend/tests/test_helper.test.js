const Note = require('../models/note');

// contains the initial database state
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

// creates a database object ID that does not belong to any note object stored in the database
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

// checks the notes in the db
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
