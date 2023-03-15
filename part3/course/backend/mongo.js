const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://josh:${password}@cluster0.can6okv.mongodb.net/noteApp?retryWrites=true&w=majority`;

// establishes the schema to be used in the database
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// creates a new object based on the Note model constructor function
const note = new Note({
  content: 'Adding new test content!',
  date: new Date(),
  important: true,
});

// Note.find({ important: true }).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
// });

const dbConnect = async () => {
  let db = null;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    console.log('datbase connected!');
    let dbRes = await note.save();
    // close the connection after note is sent
    db.close();
    return dbRes;
  } catch (error) {
    db && db.close();
    console.log(`Error in database connection: ${error}`);
    throw error;
  }
};

dbConnect()
  .then((res) => console.log(`Connected to db: ${res}`))
  .catch((error) => console.log(`Error calling: ${error}`));
