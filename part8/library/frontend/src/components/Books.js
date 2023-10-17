import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS } from '../queries/queries'
import Loading from './Loading'
import ErrorComponent from './Error'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  // console.log(`ALLBOOKS result`, result)

  // need to check if there is data e.g. if no books have been added, will throw error
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!books) {
    return null
  }

  if (result.loading) {
    return <Loading />
  }

  if (result.error) {
    return <ErrorComponent />
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
