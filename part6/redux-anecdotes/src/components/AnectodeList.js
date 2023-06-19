import { useSelector, useDispatch } from 'react-redux'
import { voteForAnectode } from '../reducers/anecdoteReducer'

const AnectodeList = () => {
  const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
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

export default AnectodeList
