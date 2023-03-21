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

app.use(cors());
// get everything in json format
app.use(express.json());
// log with morgan
app.use(morgan('tiny'));
app.use(express.static('build'));

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

const generateId = () => {
  // finds the largest number in notes
  // the spread operator turns the notes array into objects where we can then map through and access the individual numbers, which can be passed
  // as a parameter to Math.max, whereas notes without spread can't because it's an array and will return NaN
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    // need this return here, otherwise code will keep executing and malformed note will be saved
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

app.get('/api/notes/:id', (request, response) => {
  // need id as a number to compare
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
  const id = Number(request.params.id);

  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    // https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express/36507614#36507614
    response.status(404).send('Note not found').end();
  }
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on https:localhost/${PORT}`);
});
