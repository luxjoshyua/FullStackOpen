const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const { info } = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

require('express-async-errors')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require('./utils/middleware')

mongoose.set('strictQuery', false)

info('URL in use', MONGODB_URI)

const connect = async () => {
  try {
    info('connecting...')
    await mongoose.connect(MONGODB_URI)
    info('connected!')
  } catch (error) {
    error('error connecting to MongoDB:', error.message)
  }
}

const main = async () => {
  await connect()
}

main()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/notes', userExtractor, notesRouter)

// only run if application is in testing mode
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
