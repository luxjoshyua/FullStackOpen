const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');

const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const homeRouter = require('./controllers/home');

// const middleware = require('./utils/middleware');

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
} = require('./utils/middleware');

const { info } = require('./utils/logger');

const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
require('express-async-errors');

mongoose.set('strictQuery', false);

const url = config.MONGO_URL;
info(`URL in use: ${url}`);

// establish database connection
const connect = async () => {
  info(`Connecting to database...`);
  await mongoose.connect(url);
  info(`Connected to database!`);
};

const main = async () => {
  await connect();
};

main();

app.use(cors());
app.use(express.json());
// log with morgan
app.use(morgan('tiny'));

app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/', homeRouter);

app.use(unknownEndpoint);
// handler of requests with results to errors
// has to be the last loaded middleware!
app.use(errorHandler);

module.exports = app;
