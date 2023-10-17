import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PERSON, ALL_PERSONS } from '../queries/queries'

const PersonForm = ({ setError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	// useMutation hook returns an array, the first element containing the function to cause the mutation
	// second element is information about the mutation e.g. loading, error, data
	// https://www.apollographql.com/tutorials/lift-off-part4/08-the-usemutation-hook
	const [createPerson] = useMutation(CREATE_PERSON, {
		// instead of setting the poll to query on a certain interval, use refetchQueries
		// when a new person is created
		// refetchQueries: [{ query: ALL_PERSONS }],
		onError: (error) => {
			const messages = error.graphQLErrors.map((e) => e.message).join('\n')
			setError(messages)
		},
		update: (cache, response) => {
			cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
				return {
					allPersons: allPersons.concat(response.data.addPerson)
				}
			})
		}
	})

	const submit = (event) => {
		event.preventDefault()
		// query variables receive values when the query is made
		// ternary to set phone number to undefined if phone isn't passed so doesn't crash
		createPerson({ variables: { name, street, city, phone: phone.length > 0 ? phone : undefined } })

		setName('')
		setPhone('')
		setStreet('')
		setCity('')
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={submit}>
				<div>
					name{' '}
					<input
						value={name}
						required
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone{' '}
					<input
						value={phone}
						required
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<div>
					street{' '}
					<input
						value={street}
						required
						onChange={({ target }) => setStreet(target.value)}
					/>
				</div>
				<div>
					city{' '}
					<input
						value={city}
						required
						onChange={({ target }) => setCity(target.value)}
					/>
				</div>
				<button type="submit">add!</button>
			</form>
		</div>
	)
}

export default PersonForm
