import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { BirthYearForm } from './BirthYearForm'
import { ALL_AUTHORS } from '../queries/queries'

const Authors = ({ show, setError }) => {
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data && result.data.editAuthor) {
      setError('person not found')
    }
  }, [result.data, setError])

  const authors = result.data.allAuthors

  // console.log(authors)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm authors={authors} setError={setError} />
    </div>
  )
}

export default Authors
