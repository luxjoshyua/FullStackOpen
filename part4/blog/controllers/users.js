const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // salt is a random string, hash the password 10 rounds
  // 10 is the default value
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    // store the hashed password in the db, not the original!
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  // http://mongoosejs.com/docs/populate.html
  // populate() lets us reference documents in other collections
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });

  response.json(users);
});

module.exports = usersRouter;
