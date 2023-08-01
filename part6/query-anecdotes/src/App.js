import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = async (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: (anecdote.votes += 1),
    })
    await dispatch({
      type: 'showNotification',
      payload: `You voted for ${JSON.stringify(anecdote.content)}`,
    })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    // if fetch fails, retry once
    retry: 1,
    // retry: false // won't retry ever
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const anecdotes = result.data
  if (!anecdotes) {
    return (
      <div>
        <p>no anecdotes returned</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
