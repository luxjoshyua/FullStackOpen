import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

// 'notes' is the key to the query defined i.e. the list of notes
// https://tanstack.com/query/latest/docs/react/guides/query-keys
export const getNotes = () => axios.get(baseUrl).then((res) => res.data)

export const createNote = (newNote) => axios.post(baseUrl, newNote).then((res) => res.data)

export const updateNote = (updatedNote) =>
  axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then((res) => res.data)
