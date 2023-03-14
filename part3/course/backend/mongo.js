const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://josh:${password}@cluster0.can6okv.mongodb.net/?retryWrites=true&w=majority`;

// mongoose - works but is much worse than async method
//   .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('MongoDB Connected');
//     note.save();
//     console.log('New note added!');
//   })
//   .catch((error) => {
//     console.log(`Oh no, error: ${error}`);
//   });

const dbConnect = async () => {
  let db = null;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    console.log('connected!');

    let dbRes = await note.save();
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

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Adding heaps heaps more test content!',
  date: new Date(),
  important: true,
});
