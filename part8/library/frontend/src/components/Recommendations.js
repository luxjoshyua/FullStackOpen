import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'

const Recommendations = ({ show, favoriteGenre }) => {
  const booksResult = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult.data])

  if (!show) {
    return null
  }

  if (!favoriteGenre) {
    return (
      <div>
        <p>author has no selected favourite genre</p>
      </div>
    )
  }

  const filteredBooks = books.filter((book) => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      {favoriteGenre && (
        <>
          <p>
            books in your favourite genre: <strong>{favoriteGenre}</strong>{' '}
          </p>
        </>
      )}

      {filteredBooks && (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {filteredBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  {b.author && <td>{b.author.name}</td>}
                  <td>{b.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Recommendations
