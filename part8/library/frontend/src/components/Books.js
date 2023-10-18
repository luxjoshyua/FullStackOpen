import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'
import Loading from './Loading'
import ErrorComponent from './Error'

const Books = ({ show }) => {
  // can destructure {data, loading, error} = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)

  // need to check if there is data e.g. if no books have been added, will throw error
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!show) {
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
      <h2>Books</h2>
      {/* <p>
        in genre <strong>{genre}</strong>
      </p> */}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              {/* <td>{b.author.name}</td> */}
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div> */}
    </div>
  )
}

export default Books
