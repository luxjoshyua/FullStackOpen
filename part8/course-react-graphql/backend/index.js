const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
// id is handled by mongoose
// const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Person = require('./models/person')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to...', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]

const typeDefs = `
  type Address {
    street: String!
    city: String! 
  }

  enum YesNo {
    YES
    NO
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }
  
  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!
      phone: String!
    ): Person

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    addAsFriend(
      name: String!
    ): User
  }
`

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments,
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({})
      }

      // if parameter has YES value, will return all resutls containing phone
      // if parameter has NO value, will return the objects in which the phone field has no value
      return Person.find({ phone: { $exists: args.phone === 'YES' } })

      // apollo waits for the promise to resolve, then sends back the value which the Promise resolves to,
      // so it is like this:
      // const result = await Person.find({})
      // return result
    },
    // findPerson: async (root, args) => persons.find((p) => p.name === args.name),
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      }
    },
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      // spread the new object in
      const person = new Person({ ...args })
      const currentUser = context.currentUser

      // if no logged-in user can be found in context, throw error
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      try {
        await person.save()
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return person
    },

    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      person.phone = args.phone

      try {
        await person.save()
      } catch (error) {
        throw new GraphQLError('Saving number failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      return person

      // return person.save()
      // const person = persons.find((p) => p.name === args.name)
      // if (!person) {
      //   return null
      // }

      // const updatedPerson = { ...person, phone: args.phone }
      // persons = persons.map((p) => (p.name === args.name ? updatedPerson : p))
      // return updatedPerson
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username })

      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        })
      })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    // destructure the currentUser from context
    addAsFriend: async (root, args, { currentUser }) => {
      // could also be written here
      // const currentUser = context.currentUser
      const isFriend = (person) =>
        currentUser.friends.map((f) => f._id.toString()).includes(oerson._id.toString())

      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const person = await Person.findOne({ name: args.name })
      if (!isFriend(person)) {
        currentUser.friends = currentUser.friends.concat(person)
      }

      await currentUser.save()

      return currentUser
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  // object returned by context is given to all resolvers as their third parameter
  // context is the right place to do things which are shared by multiple resolvers, like user identification
  // https://www.apollographql.com/blog/backend/auth/authorization-in-graphql/
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
