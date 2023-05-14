const mongoose = require('mongoose');
require('dotenv').config();

// establish the blogSchema
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  // references are stored in both note and user documents (very different to relational databases);
  // the note references the user who created it, and the user has an array of references
  // to all of the notes created by them
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
