const { MONGODB_URI } = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const { info } = require('./utils/logger');
const mongoose = require('mongoose');
require('express-async-errors');

const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

info('URL in use', MONGODB_URI);

const connect = async () => {
  try {
    info('connecting...');
    await mongoose.connect(MONGODB_URI);
    info('connected!');
  } catch (error) {
    error('error connecting to MongoDB:', error.message);
  }
};

const main = async () => {
  await connect();
};

main();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
