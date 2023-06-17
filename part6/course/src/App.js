import { useSelector, useDispatch } from 'react-redux'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'

const App = () => {
  // useDispatch hook provides any React component access to the dispatch function
  // of the Redux store defined in index.js, allowing all components
  // to make changes to the state of the Redux store
  const dispatch = useDispatch()
  // returns the whole state of the Redux store
  const notes = useSelector((state) => state)
  // same as above
  // const notes = useSelector((state) => {
  //   return state
  // })
  // if we only wanted to return the notes marked as important
  // const importantNotes = useSelector((state) => state.filter((note) => note.important))

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // calls the creator function
    dispatch(createNote(content))
  }

  const toggleImportance = (id) => {
    // calls the creator function
    dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      {/* uncontrolled form because we have not bound the state of the form
      fields to the state of the App component */}
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
