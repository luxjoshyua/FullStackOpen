const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://josh:${password}@cluster0.can6okv.mongodb.net/?retryWrites=true&w=majority`;

// rework this into a try catch
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    note.save();
    console.log('New note added!');
  })
  .catch((error) => {
    console.log(`Oh no, error: ${error}`);
    // mongoose.connection.close();
  });
// .then(() => {
//   mongoose.disconnect();
// });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Adding even more test content is fun fun fun!',
  date: new Date(),
  important: true,
});
