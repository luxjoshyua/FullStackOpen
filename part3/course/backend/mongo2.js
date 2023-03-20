const mongoose = require('mongoose');

const content = process.argv[3];

if (process.argv.length < 2) {
  console.log('give password as argument');
  process.exit(1);
}

// establishes the schema to be used in the database
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const connect = async () => {
  console.log('Connecting...');
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected!');
};

const closeConnection = async () => {
  mongoose.connection.close();
};

const saveNote = async (content) => {
  const note = new Note({ content, date: new Date(), important: true });
  await note.save();
  console.log(`Added ${content} to note`);
};

const loadNote = async () => {
  const allNotes = await Note.find({}).then((result) => {
    result.forEach((note) => {
      console.log(`Note in note collection ${note}`);
    });
  });
  return allNotes;
};

const main = async () => {
  await connect();

  if (process.argv.length === 2) {
    await loadNote();
  }

  if (process.argv.length === 3) {
    await saveNote(content);
  }

  await closeConnection();
};

main();
