const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');

const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

mongoose.set('strictQuery', false);

const url = config.MONGO_URL;
logger.info(`URL in use: ${url}`);

// establish database connection
const connect = async () => {
  try {
    logger.info('Connecting to database...');
    await mongoose.connect(url);
    console.log(`Connected to database!`);
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message);
  }
};

const main = async () => {
  await connect();
};

main();

app.use(cors());
app.use(express.static('build'));
// get everything in json format - should be one of the first middlewares to be loaded into Express
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
// handler of requests with results to errors
// has to be the last loaded middleware!
app.use(middleware.errorHandler);

// log with morgan
app.use(morgan('tiny'));

module.exports = app;
