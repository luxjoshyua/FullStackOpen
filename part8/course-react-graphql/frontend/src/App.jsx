import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Persons from './components/Persons'
import { ALL_PERSONS } from './queries/queries'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

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
