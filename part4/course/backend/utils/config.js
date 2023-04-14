require('dotenv').config();

const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL;

const MONGO_URL =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URL : process.env.MONGO_URL;

module.exports = {
  MONGO_URL,
  PORT,
};
