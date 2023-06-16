// reducer state must be composed of immutable objects
const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      // using state.push breaks redux convention that reducers must always be pure functions
      // state.push changes the state of the state-object
      // state.concat creates a new array, which contains all the elements of the old array and the new element
      // state.push(action.payload)
      // return state
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      // search for a specific note object, the importance of which we want to change

      const noteToChange = state.find((n) => n.id === id)
      // create a new object, which is a copy of the original note,
      // only the value of the important field has been change to the
      // opposite of what it was
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      // new state is then returned
      // is created by taking all of the notes from the old state except
      // for the desired note, which is replaced with its slightly altered copy
      return state.map((note) => (note.id !== id ? note : changedNote))
    }
    default:
      return state
  }
}

export default noteReducer
