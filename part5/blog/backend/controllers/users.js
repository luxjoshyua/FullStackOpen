const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  // check both username and password are provided
  if (username === undefined || password === undefined) {
    return response.status(401).json({
      error: 'both username and password must be given',
    });
  }

  // check both username and password are >= 3 characters long
  if (username.length < 3 || password.length < 3) {
    return response.status(401).json({
      error: 'username and password must be both 3 characters or more in length',
    });
  }

  // check the username is unique
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return response.status(401).json({
      error: 'username must be unique',
    });
  }

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
