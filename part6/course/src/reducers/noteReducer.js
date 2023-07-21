import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      // convert to a string and back to a JavaScript object to make it readable
      // console.log(JSON.parse(JSON.stringify(state)))
      return state.map((note) => (note.id !== id ? note : changedNote))
    },
    // adds a note object
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    },
  },
})

// initialisation logic for the notes has been completely separated from the React component,
// much more elegant solution
// this function replaces the noteService getAll we were using in index.js
export const initializeNotes = () => {
  return async (dispatch) => {
    // fetch all notes from the server
    const notes = await noteService.getAll()
    // dispatch the setNotes action with the notes we received from the server, adding them to the Redux store
    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export default noteSlice.reducer
