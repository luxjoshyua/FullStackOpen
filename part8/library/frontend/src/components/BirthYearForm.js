import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/queries'

export const BirthYearForm = ({ authors, setError }) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')
  let { name } = authors[0]

  const [changeBornYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()
    // console.log('changing author born year...')

    if (born.length !== 4) {
      setError('Born year length must be 4')
      return null
    }

    changeBornYear({ variables: { name: author, setBornTo: parseInt(born) } })

    setAuthor(name)
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={author} onChange={({ target }) => setAuthor(target.value)}>
          {authors.map((author, index) => (
            <option key={index} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">change born year</button>
      </form>
    </div>
  )
}
