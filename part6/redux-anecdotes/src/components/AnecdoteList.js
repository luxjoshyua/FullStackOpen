import { useSelector, useDispatch } from 'react-redux'
import { voteForAnectode } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  // const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes))
  // const anecdotes = useSelector(({ anecdotes }) => {
  //   return anecdotes.sort((a, b) => b.votes - a.votes)
  // })

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      return anecdotes.sort((a, b) => b.votes - a.votes)
    }
    // chain the methods
    return anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) => anecdote.content.includes(filter))
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnectode(id))
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
