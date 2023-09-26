import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'
import App from './App'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const query = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`

// create a new client object, which is then used to send a query to the server
// the client object is how to communicate with the GraphQL server
client.query({ query }).then((response) => {
  console.log(response.data)
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // wrapping the app with apolloprovider makes the client accessible for all components
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
