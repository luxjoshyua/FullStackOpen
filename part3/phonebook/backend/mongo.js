const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

if (!(process.argv.length === 3 || process.argv.length === 5)) {
  console.log(
    `Please either enter 3 entries e.g. node mongo.js josh or 5 entries e.g. node mongo.js josh TestName 000-111`
  );
  process.exit(1);
}

// const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
// const url = `mongodb+srv://josh:${password}@cluster0.lalfif0.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(`error connecting to db: ${error.message}`);
  });

// establishes the schema to be used in the database
const personSchema = new mongoose.Schema({
  name: String,
  // number: Number,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

// creates a new person object based on the Person model constructor function
const person = new Person({
  name: name,
  number: number,
});

if (process.argv.length === 3) {
  console.log('phonebook entries:');
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  console.log('save new person to database');
  person.save().then((result) => {
    console.log(`result: ${result}`);
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
}

// const dbConnect = async (person) => {
//   let db = null;
//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     db = mongoose.connection;
//     console.log('datbase connected!');
//     if (person) {}
//     let dbRes = await person.save();
//     // close the connection after note is sent
//     db.close();
//     return dbRes;
//   } catch (error) {
//     db && db.close();
//     console.log(`Error in database connection: ${error}`);
//     throw error;
//   }
// };

// dbConnect()
//   .then((res) => {
//     // console.log(res);
//     // if (!name || !number) {
//     //   return;
//     // }
//     // console.log(db);
//     console.log(`addded ${name} number ${number} to phonebook`);
//     // console.log(`Connected to db: ${res}`)
//   })
//   .catch((error) => {
//     console.log(`Error calling: ${error}`);
//   });
