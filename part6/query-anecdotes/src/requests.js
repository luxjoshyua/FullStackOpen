import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// 'anecdotes' is the key to the query defined
export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((res) => res.data)

export const updateAnecdote = (updatedAnecdote) =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then((res) => res.data)
