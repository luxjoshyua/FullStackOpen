const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: {
    type: Boolean,
    default: true,
  },
  // references are stored in both note and user documents (very different to relational databases);
  // the note references the user who created it, and the user has an array of references
  // to all of the notes created by them
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteSchema);
