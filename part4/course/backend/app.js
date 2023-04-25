const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
require('express-async-errors');

const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

logger.info('URL in use', config.MONGODB_URI);

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info('connected to MongoDB');
//   })
//   .catch((error) => {
//     logger.error('error connecting to MongoDB:', error.message);
//   });

const connect = async () => {
  console.log('connecting...');
  await mongoose.connect(config.MONGODB_URI);
  console.log('connected');
  // try {

  // } catch (error) {
  //   logger.error('error connecting to MongoDB:', error.message);
  // }
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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
