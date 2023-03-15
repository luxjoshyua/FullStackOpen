const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log(
    `Please either enter 3 entries e.g. node mongo.js josh or 5 entries e.g. node mongo.js josh TestName 000-111`
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://josh:${password}@cluster0.lalfif0.mongodb.net/phonebook?retryWrites=true&w=majority`;

const name = process.argv[3];
const number = process.argv[4];

// establishes the schema to be used in the database
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// creates a new person object based on the Person model constructor function
// const person = new Person({
//   name: 'Sam Smith',
//   number: '000-111-222-333',
//   date: new Date(),
// });

const person = new Person({
  name: name,
  number: number,
  date: new Date(),
});

const dbConnect = async () => {
  let db = null;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    console.log('datbase connected!');
    let dbRes = await person.save();
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
  .then((res) => {
    // console.log(res);
    // if (!name || !number) {
    //   return;
    // }
    // console.log(db);
    console.log(`addded ${name} number ${number} to phonebook`);
    // console.log(`Connected to db: ${res}`)
  })
  .catch((error) => {
    console.log(`Error calling: ${error}`);
  });

// if (process.argv.length === 3) {
//   console.log('only 3 args provided, map through Person model and show all entries');
//   // search through collection here?
//   Person.find({}).then((persons) => {
//     console.log(persons);
//   });
//   // close connection ?
// }
