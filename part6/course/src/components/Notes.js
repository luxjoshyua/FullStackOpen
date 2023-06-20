import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = () => {
  // useDispatch hook provides any React component access to the dispatch function
  // of the Redux store defined in index.js, allowing all components
  // to make changes to the state of the Redux store
  const dispatch = useDispatch()
  // returns the whole state of the Redux store
  // const notes = useSelector((state) => state)
  // returns the field notes of the combined Redux store
  // const notes = useSelector((state) => state.notes)

  const notes = useSelector(({ filter, notes }) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  })

  // if we only wanted to return the notes marked as important
  // const importantNotes = useSelector((state) => state.filter((note) => note.important))
  const toggleImportance = (id) => {
    // calls the creator function
    dispatch(toggleImportanceOf(id))
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note.id)}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </ul>
  )
}

export default Notes
