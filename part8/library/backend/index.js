const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI
// console.log('connecting to...', MONGODB_URI)

// mongoose
//   .connect(MONGODB_URI)
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch(() => {
//     console.log('error connecting to MongoDB', error.message)
//   })

const connect = async (uri) => {
  try {
    console.log(`connecting to ${MONGODB_URI}`)
    await mongoose.connect(uri)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connecting to MongoDB', error.message)
  }
}

const main = async () => {
  connect(MONGODB_URI)
}

main()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      // console.log(`token`, decodedToken)
      const currentUser = await User.findById(decodedToken.id)
      // console.log(`currentUser`, currentUser)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
