import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../queries/queries'

const PhoneForm = ({ setError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	// always need to destructure from the useMutation array
	// returns two items; first is mutate function, second is object with laoding, data, error in it
	// https://www.apollographql.com/tutorials/lift-off-part4/08-the-usemutation-hook
	const [changeNumber, { data }] = useMutation(EDIT_NUMBER)

	const submit = (event) => {
		event.preventDefault()

		changeNumber({ variables: { name, phone } })

		setName('')
		setPhone('')
	}

	useEffect(() => {
		if (data && data.editNumber === null) {
			setError('person not found')
		}
	}, [data, setError])

	return (
		<div>
			<h2>change number</h2>

			<form onSubmit={submit}>
				<div>
					name{' '}
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone{' '}
					<input
						value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<button type="submit">change number</button>
			</form>
		</div>
	)
}

export default PhoneForm
