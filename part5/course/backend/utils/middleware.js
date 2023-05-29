const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const logger = require('./logger');
const { SECRET } = require('./config');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }

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

  if (token) {
    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
  }

  return next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
