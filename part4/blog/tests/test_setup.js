const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Blog = require('../models/blog');
const User = require('../models/user');

const { initialBlogs } = require('./test_helper');
const { info } = require('../utils/logger');
const { MONGO_URL } = require('../utils/config');

module.exports = {
  setupDB() {
    // connect to db
    beforeAll(async () => {
      info('connecting...');
      await mongoose.connect(MONGO_URL);
      info('connected!');
    });

    // cleanup db before each test
    beforeEach(async () => {
      await Blog.deleteMany({});
      // await User.deleteMany({});

      for (let blog of initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
      }
    });

    // close the db connection after tests have run
    afterAll(async () => {
      await mongoose.connection.close();
    });
  },

  setupDBUser() {
    // connect to db
    beforeAll(async () => {
      info('connecting...');
      await mongoose.connect(MONGO_URL);
      info('connected!');
    });

    // cleanup db before each test
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash('sekret', 10);
      const user = new User({ username: 'root', passwordHash });

      await user.save();
    });

    // close the db connection after tests have run
    afterAll(async () => {
      await mongoose.connection.close();
    });
  },
};
