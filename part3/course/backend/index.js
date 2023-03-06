// import node's built-in web-server module
// const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

// middleware function
// has to be taken into use before declaring routes
// has to be used after app.use(express.json()), otherwise `request.body`
// will not be initialised when the logger is executed
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('---');
  // next function yields control to the next middleware
  next();
};

// middleware for catching requests to non-existent routes
// will return an error in JSON format
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
// get everything in json format
app.use(express.json());
// pass the middleware
app.use(requestLogger);
app.use(express.static('build'));

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];

app.get('/', (request, response) => {
  // the request is answered by using the send method of the response object
  // calling the method makes the server respond to the HTTP request by sending a response containing the string 'hello world'
  // that was passed to the `send` method. As it's a string, express automatically sets the value of the Content-Type header
  // to be text/htmt, status code defaults to 200
  response.send('<h1>Hello world!</h1>');
});

app.get('/api/notes', (request, response) => {
  // log request.headers to check all the headers of a request
  // console.log(request.headers);
  response.json(notes);
});

const generateId = () => {
  // finds the largest number in notes
  // the spread operator turns the notes array into objects where we can then map through and access the individual numbers, which can be passed
  // as a parameter to Math.max, whereas notes without spread can't because it's an array
  // and will return NaN
  // console.log(...notes);
  // console.log(notes);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
