const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config();

const url = process.env.MONGO_URL;
console.log(`URL in use: ${url}`);

// establish database connection
const connect = async () => {
  try {
    console.log(`Connecting...`);
    await mongoose.connect(url);
    console.log(`Connected to database!`);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

// close database connection when finished
const closeConnection = async () => {
  mongoose.connection.close();
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (value) => /\d{2,3}-\d{3,}/.test(value),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);

const main = async () => {
  await connect();
};

main();

module.exports = Person;
