const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const { UserInputError } = require('apollo-server')
const Author = require('./models/author')
const Book = require('./models/book')

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

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
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
  },
}

module.exports = resolvers
