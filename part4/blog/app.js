const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');

const blogRouter = require('./controllers/blog');
const homeRouter = require('./controllers/home');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
require('express-async-errors');
mongoose.set('strictQuery', false);

const url = config.MONGO_URL;
// logger.info(`URL in use: ${url}`);

// establish database connection
const connect = async () => {
  logger.info(`Connecting to database...`);
  await mongoose.connect(url);
  logger.info(`Connected to database!`);
};

// logger.info('connecting to mongoddb');

// mongoose
//   .connect(config.MONGO_URL)
//   .then(() => {
//     logger.info('connected to MongoDB');
//   })
//   .catch((error) => {
//     logger.error('error connection to MongoDB:', error.message);
//   });

const main = async () => {
  await connect();
};

main();

app.use(cors());
app.use(express.json());
// log with morgan
app.use(morgan('tiny'));
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/', homeRouter);

app.use(middleware.unknownEndpoint);
// handler of requests with results to errors
// has to be the last loaded middleware!
app.use(middleware.errorHandler);

module.exports = app;
