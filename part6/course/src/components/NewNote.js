import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // calls the creator function
    dispatch(createNote(content))
  }

  return (
    <>
      {/* uncontrolled form because we have not bound the state of the form
      fields to the state of the App component */}
      <form onSubmit={addNote} style={{ marginBottom: '1rem' }}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default NewNote
