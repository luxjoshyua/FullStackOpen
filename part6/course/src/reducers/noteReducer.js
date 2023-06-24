import { createSlice } from '@reduxjs/toolkit'

// const initialState = [
//   {
//     content: 'reducer defines how redux store works',
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'state of store can contain any data',
//     important: false,
//     id: 2,
//   },
// ]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// reducer state must be composed of immutable objects
// const noteReducer = (state = initialState, action) => {
//   // console.log('ACTION: ', action)
//   switch (action.type) {
//     case 'NEW_NOTE':
//       // using state.push breaks redux convention that reducers must always be pure functions
//       // state.push changes the state of the state-object
//       // state.concat creates a new array, which contains all the elements of the old array and the new element
//       // state.push(action.payload)
//       // return state
//       // return state.concat(action.payload)
//       return [...state, action.payload]
//     case 'TOGGLE_IMPORTANCE': {
//       const id = action.payload.id
//       // search for a specific note object, the importance of which we want to change
//       const noteToChange = state.find((n) => n.id === id)
//       // create a new object, which is a copy of the original note,
//       // only the value of the important field has been change to the
//       // opposite of what it was
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       }
//       // new state is then returned
//       // is created by taking all of the notes from the old state except
//       // for the desired note, which is replaced with its slightly altered copy
//       return state.map((note) => (note.id !== id ? note : changedNote))
//     }
//     default:
//       return state
//   }
// }

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
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

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer
