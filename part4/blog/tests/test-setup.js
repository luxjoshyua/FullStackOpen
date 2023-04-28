const mongoose = require('mongoose');
const Blog = require('../models/blog');
const { initialBlogs } = require('./test_helper');

module.exports = {
  setupDB() {
    // connect to db
    beforeAll(async () => {
      console.log('connecting...');
      await mongoose.connect(process.env.MONGO_URL);
      console.log('connected!');
    });

    // cleanup db before each test
    beforeEach(async () => {
      await Blog.deleteMany({});

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
};
