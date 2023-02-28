// import node's built-in web-server module
// const http = require('http');
const express = require('express');
const app = express();

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
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  // need id as a number to compare
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
  const id = Number(request.params.id);
  // console.log(id);
  // const note = notes.find((note) => note.id === id);
  // const note = notes.find((note) => {
  //   // console.log(note.id, typeof note.id, id, typeof id, note.id === id);
  //   return note.id === id;
  // });

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

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
