import { useSelector, useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      const anecdotesCopy = [...anecdotes]
      return anecdotesCopy.sort((a, b) => b.votes - a.votes)
    }
    // chain the methods
    const anecdotesCopy = [...anecdotes]
    return anecdotesCopy
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) => anecdote.content.toLowerCase().includes(filter))
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id)
    dispatch(createNotification(`You voted for ${anecdote.content}`, 5))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
