import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from '../queries/queries'

const NewBook = ({ setError, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      setError(messages)
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    // console.log('add book...')
    // createBook({ variables: { title, author, published: parseInt(published), genres } })
    createBook({ variables: { title, author, published, genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!show) {
    return null
  }

  return (
    <div style={{ padding: '1rem 0' }}>
      <form onSubmit={submit}>
        <div style={{ paddingBottom: '.5rem' }}>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            style={{ marginLeft: '.5rem' }}
          />
        </div>
        <div style={{ paddingBottom: '.5rem' }}>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            style={{ marginLeft: '.5rem' }}
          />
        </div>
        <div style={{ paddingBottom: '.5rem' }}>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.valueAsNumber)}
            style={{ marginLeft: '.5rem' }}
          />
        </div>
        <div style={{ paddingBottom: '.5rem' }}>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            style={{ marginLeft: '.5rem' }}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div style={{ paddingBottom: '.5rem' }}>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
