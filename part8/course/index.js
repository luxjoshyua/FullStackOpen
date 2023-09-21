const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

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

// this is the GraphQL schema
// any operation that causes a change is done with mutations
// in the example mutation below, phone is the only property that is nullable ie it doesn't require value
// the mutation also has a return value of type Person. The details of the added person are returned if the operation is successful and if not, null.
// generation of id is handled by the server
// https://graphql.org/learn/queries/#mutations
const typeDefs = `
type Address {
  street: String!
  city: String!
}

type Person {
  name: String!
  phone: String    
  address: Address!
  id: ID!
}

enum YesNo {
  YES
  NO
}

type Query {
  personCount: Int!
  allPersons(phone: YesNo): [Person!]!
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
}
`

// example query for a single person
// query {
//   findPerson(name: 'Arto Hellas') {
//     phone
//     address {
//     city
//     street
//     }
//   }
// }

// example response from above query
// {
//   "data": {
//     "findPerson": {
//       "phone": "040-123543",
//       "address":  {
//         "city": "Espoo",
//         "street": "Tapiolankatu 5 A"
//       }
//     }
//   }
// }

// this is an object, which contains the resolvers of the server
// it defines how GraphQL queries are responded to
// the resolvers correspond to the queries described in the schema above
const resolvers = {
  Query: {
    personCount: () => persons.length, // query returns the length of the persons array

    allPersons: (root, args) => {
      if (!args.phone) {
        // returbs all objects from the persons array
        return persons
      }
      // if the enum is YES, return the persons with a phone number, otherwise return the persons without a phone number
      const byPhone = (person) => (args.phone === 'YES' ? person.phone : !person.phone)
      return persons.filter(byPhone)
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
  // for individual person, default resolvers are provided
  // don't need to hardcode the below; graphql provides by default
  // can hardcode some and leave the rest as default if needed
  Person: {
    // name, phone and id are returned using their default resolvers, but the field address
    // is formed by using a self-defined resolver
    // address: (root) => {
    //   return {
    //     street: root.street,
    //     city: root.city,
    //   }
    // },
    // written more succintly
    address: ({ street, city }) => {
      return {
        street,
        city,
      }
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      // prevent adding same name to phonebook multiple times
      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }

      const person = { ...args, id: uuid() }
      // concat returns new array, containing the joined arrays
      persons = persons.concat(person)
      return person
    },
    editNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name)
      if (!person) {
        return null
      }
      // spread in the person, update phone field with new args
      const updatedPerson = { ...person, phone: args.phone }
      // mutation finds the person to be updated by the field name
      persons = persons.map((p) => (p.name === args.name ? updatedPerson : p))
      return updatedPerson
    },
  },
}

// this is the heart of the code, sets everything up
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
