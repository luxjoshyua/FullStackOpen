const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log(`
    Please either enter 3 entries e.g. node mongo.js josh or 5 entries e.g. node mongo.js josh TestName 000-111`);
  process.exit(1);
}

// const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
console.log(`name ${name}, number ${number} `);

// establishes the schema to be used in the database
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const connect = async () => {
  console.log('Connecting...');
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected !');
};

const closeConnection = async () => {
  mongoose.connection.close();
};

const savePerson = async (name, number) => {
  const person = new Person({
    name,
    number,
    // number: number,
  });
  await person.save();
  console.log(`Added ${name} number ${number} to phonebook`);
};

const loadPeople = async () => {
  const people = await Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`Person in phonebook name ${person.name} number ${person.number}`);
    });
  });
  return people;
};

const main = async () => {
  await connect();
  if (process.argv.length === 3) {
    await loadPeople();
  }

  if (process.argv.length === 5) {
    await savePerson(name, number);
    // console.log(`Added ${name} number ${number} to phonebook`);
  }

  await closeConnection();
};

main();
