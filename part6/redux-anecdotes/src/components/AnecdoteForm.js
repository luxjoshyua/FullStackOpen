import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnectode = async (event) => {
    event.preventDefault()
    const anectode = event.target.anectode.value
    if (!anectode) return null
    event.target.anectode.value = ''

    const newAnecdote = await anecdoteService.createNew(anectode)
    dispatch(createAnecdote(newAnecdote))

    // dispatch(createAnecdote(anectode))
    dispatch(createNotification(`You created '${anectode}'`, 5))
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
