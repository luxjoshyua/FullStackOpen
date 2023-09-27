import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_PERSON } from '../queries/queries'

const Person = ({ person, onClose }) => {
	return (
		<div>
			<h2>{person.name}</h2>
			<div>
				{person.address.street} {person.address.city}
			</div>
			<div>{person.phone}</div>
			<button onClick={onClose}>close</button>
		</div>
	)
}

const Persons = ({ persons }) => {
	const [nameToSearch, setNameToSearch] = useState(null)
	const { data } = useQuery(FIND_PERSON, {
		variables: { nameToSearch },
		skip: !nameToSearch
	})

	if (nameToSearch && data) {
		return (
			<Person
				person={data.findPerson}
				onClose={() => setNameToSearch(null)}
			/>
		)
	}

	return (
		<div>
			<h2>Persons</h2>
			{persons.map((person) => (
				<div key={person.name}>
					{person.name} {person.phone}
					<button onClick={() => setNameToSearch(person.name)}>show address</button>
				</div>
			))}
		</div>
	)
}

export default Persons
