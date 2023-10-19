import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'
import Loading from './Loading'
import ErrorComponent from './Error'

const Books = ({ show }) => {
  // can destructure {data, loading, error} = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS)
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })
  const [genre, setGenre] = useState('all')
  const [books, setBooks] = useState(null)

  // need to check if there is data e.g. if no books have been added, will throw error
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult.data])

  if (!show) {
    return null
  }

  if (result.loading) {
    return <Loading />
  }

  if (result.error) {
    return <ErrorComponent />
  }

  const { allBooks } = result.data

  // remove the duplicate genres from the array
  const genres = [...new Set(allBooks.flatMap((book) => book.genres))].concat('all')

  const handleGenreClick = (genre) => {
    setGenre(genre)
    if (genre === 'all') {
      setBooks(allBooks)
      return
    }

    getBooksByGenre({ variables: { genre: genre } })
  }

  return (
    <div>
      <h2>Books</h2>

      {genre && (
        <p>
          in selected genre <strong>{genre}</strong>{' '}
        </p>
      )}

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
              {b.author && <td>{b.author.name}</td>}
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <p>Genres:</p>
        {genres &&
          genres.map((genre) => (
            <button key={genre} onClick={() => handleGenreClick(genre)}>
              {genre}
            </button>
          ))}
      </div>
    </div>
  )
}

export default Books
