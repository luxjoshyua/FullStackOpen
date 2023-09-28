import { useState } from 'react'

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

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
            onChange={({ target }) => setPublished(target.value)}
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
