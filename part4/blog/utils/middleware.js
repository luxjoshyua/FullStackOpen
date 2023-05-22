const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

// middleware for catching requests to non-existent routes
// will return an error in JSON format
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  // CastError exception is an invalid object id for Mongo
  if (error.name === 'CastError') {
    // 400 - request can't be understood by the server due to malformed syntax
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

  // in all other error cases, pass error forward on to default Express error handler
  next(error);
};

// helper function isolates the token from the authorization header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // return authorization without 'bearer ' prefix, so from index 7 onwards
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  return next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: 'token missing' });
  }

  // the validity of the token is checked with jwt.verify
  // method also decodes the token, or returns the Object which the token was based on
  const decodedToken = jwt.verify(token, process.env.SECRET);

  // if the object decoded from the token does not contain the user's identity
  // (decodedToken.id is undefined), error status code 401 returned,
  // reason is explained in the response body
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);

  // the identity of the maker of the request is resolved, assign request.user to authenticated user
  request.user = user;

  return next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
