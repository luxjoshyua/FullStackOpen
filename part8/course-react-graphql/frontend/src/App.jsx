import { useState } from 'react'
import { useApolloClient, useQuery, useMutation, useSubscription } from '@apollo/client'

import Persons from './components/Persons'
import { ALL_PERSONS, PERSON_ADDED } from './queries/queries'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedPerson) => {
	// helper that is used to eliminate saving some person twice
	const uniqueByName = (a) => {
		let seen = new Set()
		return a.filter((item) => {
			let k = item.name
			return seen.has(k) ? false : seen.add(k)
		})
	}

	cache.updateQuery(query, ({ allPersons }) => {
		return {
			allPersons: uniqueByName(allPersons.concat(addedPerson))
		}
	})
}

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null)
	// useQuery is the common way of querying and then accessing the data
	// it makes the query it receives as a parameter, then returns an object with multiple fields
	// https://www.apollographql.com/docs/react/api/react/hooks/#usequery
	// https://www.apollographql.com/docs/react/api/react/hooks/#result - for available fields
	const { loading, error, data } = useQuery(ALL_PERSONS, {
		// make the query every two seconds
		// https://www.apollographql.com/docs/react/data/queries/#polling
		// pollInterval: 2000
	})
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	// console.log(`RESULT = `, result)

	// when a new person is added, the server sends a notification to the client, and the callback function defined in the onData attribute is called
	// and given the details of the new person as parameters
	useSubscription(PERSON_ADDED, {
		onData: ({ data }) => {
			// console.log(data)
			const addedPerson = data.data.personAdded
			// const addedPerson = {data: {personAdded}}
			notify(`${addedPerson.name} added`)
			updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
		}
	})

	if (loading) return <div>loading....</div>
	if (error) return <div>error....</div>

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	// sets token state to null, removes token from local storage, resets the cache of the apollo client
	// resetting the cache is important, because some queries might have fetched data to cache,
	// which only logged-in users should have access to
	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMessage} />
				<LoginForm
					setToken={setToken}
					setError={notify}
				/>
			</div>
		)
	}

	return (
		<>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>logout</button>
			<Persons persons={data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</>
	)
}

export default App
