import { gql, useQuery } from '@apollo/client'
import Persons from './components/Persons'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

// example query using GraphQL variables
// https://graphql.org/learn/queries/#variables
// query findPersonByName($nameToSearch: String!) {
//   findPerson(name: $nameToSearch) {
//     name
//     phone
//     address {
//       street
//       city
//     }
//   }
// }

const App = () => {
  // useQuery is the common way of querying and then accessing the data
  // it makes the query it receives as a parameter, then returns an object with multiple fields
  // https://www.apollographql.com/docs/react/api/react/hooks/#usequery
  // https://www.apollographql.com/docs/react/api/react/hooks/#result - for available fields
  const result = useQuery(ALL_PERSONS)

  // console.log(`RESULT = `, result)

  if (result.loading) {
    return <div>loading...</div>
  }

  return <Persons persons={result.data.allPersons} />
}

export default App
