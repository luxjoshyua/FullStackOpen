const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

const errorHandler = (error, request, response, next) => {
  console.log(`Error handler called: ${error.message}`);

  // CastError exception is an invalid object id for Mongo
  if (error.name === 'CastError') {
    // 400 - request can't be understood by the server due to malformed syntax
    return response.status(400).send({ error: 'malformatted id' });
  }

  // in all other error cases, pass error forward on to default Express error handler
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('build'));

// let persons = [];

// check base route is working
app.get('/', (request, response) => {
  // console.log(request);
  response.send('<h1>Hello world, app is working</h1>');
});

const loadPerson = async (response) => {
  const allPeople = await Person.find({});
  return response.json(allPeople);
};

// get request to handle all data
app.get('/api/persons', async (request, response) => {
  // check the headers being set
  // console.log(request.headers);
  await loadPerson(response);
});

app.get('/info', async (request, response) => {
  const date = new Date();
  try {
    const people = await Person.find({});
    return response.send(
      `<div><p>Phonebook has info for ${people.length} people</p><p>${date}</p></div>`
    );
  } catch (error) {
    console.log(`Error in GET info route: ${error}`);
  }
});

// post request to handle creating new person data
app.post('/api/persons', async (request, response) => {
  const body = await request.body;

  if (!body.name || !body.number) {
    // 400: server cannot process request because of client side error
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  const savedPerson = await person.save();
  console.log(`Person successfully saved to database: ${savedPerson}`);
  response.json(savedPerson);
});

// get request to handle single person data
app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

// delete request to handle deleting single person data
app.delete('/api/persons/:id', async (request, response) => {
  try {
    const personToDelete = await Person.findByIdAndRemove(request.params.id);
    if (personToDelete) {
      response.status(204).end();
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.use(unknownEndpoint);
// handler of requests with results to errors
// has to the last loaded middleware!
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server up and running on localhost:${PORT}`);
});
