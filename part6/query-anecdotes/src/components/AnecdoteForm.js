import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({
        type: 'showNotification',
        payload: 'Anecdote needs to be 5 characters or more in length',
      })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    },
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    await dispatch({ type: 'showNotification', payload: `You added: ${content}` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit" onClick={() => dispatch('CREATED')}>
          create
        </button>
      </form>
    </div>
  )
}

export default AnecdoteForm
