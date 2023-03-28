const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('build'));

let persons = [];

// check base route is working
app.get('/', (request, response) => {
  // console.log(request);
  response.send('<h1>Hello world, app is working</h1>');
});

const loadPerson = async (response) => {
  const allPeople = await Person.find({}).then((people) => {
    response.json(people);
  });
  return allPeople;
};

// get request to handle all data
app.get('/api/persons', async (request, response) => {
  // check the headers being set
  // console.log(request.headers);
  await loadPerson(response);
});

// get request to return general info
// app.get('/info', (request, response) => {
//   const date = new Date();
//   response.send(`
//     <div>
//       <p>Phonebook has info for ${persons.length} people</p>
//       <p>${date}</p>
//     </div>
//     `);
// });

app.get('/info', async (request, response) => {
  try {
    const date = new Date();
    const info = await loadPerson(response);
    console.log(`INFO in GET info route: ${info}`);

    response.send(`
      <div>
        <p>Phonebook has info for some people</p>
        <p>${date}</p>
      </div>
      `);
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
// app.get('/api/persons/:id', (request, response) => {
//   Person.findById(request.params.id).then((person) => {
//     response.json(person);
//   });
// });

// get request to handle single person data
app.get('/api/persons/:id', async (request, response) => {
  try {
    const person = await Person.findById(request.params.id);
    return person ? response.json(person) : response.status(404).end();
  } catch (error) {
    console.log(`Error in GET api/persons/:id route: ${error}`);
  }
});

// delete request to handle deleting single person data
app.delete('/api/persons/:id', async (request, response) => {
  try {
    const personToDelete = await Person.findByIdAndRemove(request.params.id);
    return personToDelete ? response.status(204).end() : response.status(404).end();
  } catch (error) {
    console.log(`Error in DELETE api/persons/:id route: ${error}`);
  }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server up and running on ${PORT}`);
});
