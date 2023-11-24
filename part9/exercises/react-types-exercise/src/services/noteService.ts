import axios from 'axios'
import { Note, NewNote } from '../types/types'

const baseUrl = 'http://localhost:3001/notes'

export const getAllNotes = () => {
  // Note[] gets rid of response.data being any type, rather it expects an array of objects
  // response.body is of type any
  return axios.get<Note[]>(baseUrl).then((response) => response.data)
}

export const createNote = (object: NewNote) => {
  return axios.post<Note>(baseUrl, object).then((response) => response.data)
}
