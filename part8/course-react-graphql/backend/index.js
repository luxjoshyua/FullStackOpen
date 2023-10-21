const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const express = require('express')
const cors = require('cors')
const http = require('http')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const User = require('./models/user')
require('dotenv').config()

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

// different connection method
// follow the course way to make debugging easier
// const connect = async (uri) => {
//   try {
//     console.log(`connecting to ${MONGODB_URI}`)
//     await mongoose.connect(uri)
//     console.log('connected to MongoDB')
//   } catch (error) {
//     console.log('error connecting to MongoDB', error.message)
//   }
// }

// const main = async () => {
//   connect(MONGODB_URI)
// }

// main()

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// setup is now within a function, as we need to be able to use Express middleware,
// with the GraphQL server acting as middleware
// function needs to be asynchronous, as it allows waiting for the GraphQL server to start
// https://www.apollographql.com/docs/apollo-server/api/express-middleware/
const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  // connected to listen to the root of the server i.e. to the / route, using the expressMiddleware object
  const server = new ApolloServer({
    schema,

    // plugin helps ensure server shuts down gracefully
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      // information about logged-in user is set in the context
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id).populate('friends')
          return { currentUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http:localhost:${PORT}`)
  })
}

start()
