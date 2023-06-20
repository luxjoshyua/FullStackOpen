import { useDispatch } from 'react-redux'
import { createAnectode } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnectode = (event) => {
    event.preventDefault()
    const anectode = event.target.anectode.value
    event.target.anectode.value = ''
    dispatch(createAnectode(anectode))
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnectode}>
        <div>
          <input name="anectode" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
