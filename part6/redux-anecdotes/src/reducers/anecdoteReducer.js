import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  // empty state on initialisation, then populate with db data
  initialState: [],
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      // console.log(JSON.parse(JSON.stringify(state)))
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = (content) => {
  return async (dispatch) => {
    // fetch all anecdotes from the server
    const anecdotes = await anecdoteService.getAll()
    // dispatch the setAnecdote action with the anecdotes we received from the server, adding them to the redux store
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.voteFor(id)
    dispatch(voteForAnecdote(id))
  }
}

export const { voteForAnecdote, displayNotification, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions

export default anecdoteSlice.reducer
