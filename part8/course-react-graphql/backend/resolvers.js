const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { GraphQLError } = require('graphql')

const jwt = require('jsonwebtoken')

const Person = require('./models/person')
const User = require('./models/user')

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments,
    allPersons: async (root, args) => {
      console.log('Person.find')
      if (!args.phone) {
        return Person.find({}).populate('friendOf')
      }

      // if parameter has YES value, will return all results containing phone
      // if parameter has NO value, will return the objects in which the phone field has no value
      return Person.find({ phone: { $exists: args.phone === 'YES' } }).populate('friendOf')

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
    friendOf: async (root) => {
      const friends = await User.find({
        friends: {
          $in: [root.id],
        },
      })
      console.log('User.find')

      // return list of users
      return friends
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

      pubsub.publish('PERSON_ADDED', { personAdded: person })

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

  // https://www.apollographql.com/docs/apollo-server/data/subscriptions/
  Subscription: {
    personAdded: {
      // the resolver of the personAdded subscription registers and saves info about all the clients that do the subscription
      // the clients are saved to an "iterator object" called PERSON_ADDED using this Subcription{} code
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
    },
  },
}

module.exports = resolvers
