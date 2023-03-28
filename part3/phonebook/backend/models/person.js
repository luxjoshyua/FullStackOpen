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

// establish the personSchema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
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
