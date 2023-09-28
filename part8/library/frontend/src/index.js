import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import App from './App'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

// create a new client object, which is then used to send a query to the server
// the client object is how to communicate with the GraphQL server
// client.query({ query }).then((response) => {
//   console.log(response.data)
// })

ReactDOM.createRoot(document.getElementById('root')).render(
  // wrapping the app with apolloprovider makes the client accessible for all components
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
)
