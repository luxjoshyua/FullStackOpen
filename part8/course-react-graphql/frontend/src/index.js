import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import App from './App'

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('phonenumbers-user-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null
		}
	}
})

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }))

const splitLink = split(
	// destructure the returned query
	({ query }) => {
		const definition = getMainDefinition(query)
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
	},
	wsLink,
	authLink.concat(httpLink)
)

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// wrapping the app with apolloprovider makes the client accessible for all components
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)
