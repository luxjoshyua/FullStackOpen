import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import { ALL_PERSONS } from './queries/queries'
import PersonForm from './components/PersonForm'
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm'

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

	// console.log(`RESULT = `, result)

	if (loading) return <div>loading....</div>
	if (error) return <div>error....</div>

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<Persons persons={data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</div>
	)
}

export default App
