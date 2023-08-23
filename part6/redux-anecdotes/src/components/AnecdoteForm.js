import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if (!anecdote) return null
    event.target.anecdote.value = ''

    dispatch(createAnecdote(anecdote))

    console.log(`You created '${anecdote}'`)

    dispatch(createNotification(`You created '${anecdote}'`, 5))
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
