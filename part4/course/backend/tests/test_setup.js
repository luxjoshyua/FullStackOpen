const mongoose = require('mongoose');
const Note = require('../models/note');
const { initialNotes } = require('./test_helper');
const { info } = require('../utils/logger');
const { MONGODB_URI } = require('../utils/config');

module.exports = {
  setupDB() {
    // connect to db
    beforeAll(async () => {
      info('connecting...');
      await mongoose.connect(MONGODB_URI);
      info('connected!');
    });

    // cleanup db before each test
    beforeEach(async () => {
      await Note.deleteMany({});

      for (let note of initialNotes) {
        let noteObject = new Note(note);
        await noteObject.save();
      }
    });

    // close the db connection after tests have run
    afterAll(async () => {
      await mongoose.connection.close();
    });
  },
};
