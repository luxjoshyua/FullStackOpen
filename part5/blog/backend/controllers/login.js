const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  // search for the user by the username sent in the request
  const user = await User.findOne({ username });

  // compare the password sent in the body to the hashed password saved to the user
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  // no user and password not correct
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      // explain reason for failure in response.body
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // if the password is correct, token is created with the method jwt.sign
  // token contains username and the user.id in digitally signed form
  // token expires in 60*60 seconds, so 1 hour
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

  // pass the user id - very very important!
  response.status(200).send({ token, username: user.username, name: user.name, id: user.id });
});

module.exports = loginRouter;
