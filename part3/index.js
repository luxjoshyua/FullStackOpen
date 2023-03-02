const express = require('express');
const app = express();
const faker = require('@faker-js/faker');

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  console.log(request);
  response.send('<h1>Hello world, app is working</h1>');
});

// get request to handle all data
app.get('/api/persons', (request, response) => {
  // check the headers being set
  // console.log(request.headers);
  response.json(persons);
});

// get request to handle single person data
app.get('/api/persons/:id', (request, response) => {
  // need id as a number to compare - strict equality data type
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
  const id = Number(request.params.id);

  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send('Person not found').end();
  }
});

// get request to return general info
app.get('/info', (request, response) => {
  const date = new Date();
  response.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
    </div>
    `);
});

// delete request to handle deleting single person data
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 100);
};

// post request to handle creating new person data
app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    // 400: server cannot process request because of client side error
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const duplicateName = persons.find((person) => person.name === body.name);
  if (duplicateName) {
    return response.status(400).json({
      error: 'Duplicate name',
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
