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

// mongoose
//   .connect(url)
//   .then((result) => console.log(`Connected to db: ${result}`))
//   .catch((error) => console.log(`Error connecting to db: ${error.message}`));

// close database connection when finished
const closeConnection = async () => {
  mongoose.connection.close();
};

// establish the noteSchema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;

const main = async () => {
  await connect();
  // await closeConnection()
};

main();
