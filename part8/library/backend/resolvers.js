const { GraphQLError } = require('graphql')
const { UserInputError } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

let authors = []
let books = []

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({
          $and: [{ author: { $in: author.id } }, { genres: { $in: args.genre } }],
        }).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: { $in: author.id } }).populate('author')
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('genre')
      }

      return Book.find({}).populate('author')
    },

    allAuthors: async (root, args) => {
      books = await Book.find({})
      return Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      return books.filter((book) => book.author === root.name).length
      // also works, safer because type matching
      // return books.filter((book) => String(book.author) === String(root.id)).length
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      // if no logged-in user can be found, throw error
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const book = new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      // ====== REMEMBER TO RETURN THE VALUE ======
      return book
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      if (!author) {
        console.log('no author found')
        return null
      }
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return author
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

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
  },
}

module.exports = resolvers
