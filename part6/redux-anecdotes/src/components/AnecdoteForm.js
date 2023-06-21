import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnectode = (event) => {
    event.preventDefault()
    const anectode = event.target.anectode.value
    event.target.anectode.value = ''
    dispatch(createAnecdote(anectode))
    dispatch(createNotification(`You created ${anectode}`))
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
