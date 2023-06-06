import { useState } from 'react'
import { Notification } from './Notification'

const NoteForm = ({ createNote, successMessage }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      // important: true,
      important: Math.random() > 0.5,
    })

    setNewNote('')
  }

  return (
    <div className="formDiv">
      <p>Create a new note</p>
      <form onSubmit={addNote} style={{ marginBottom: '.5rem' }}>
        {successMessage && <Notification message={successMessage} success={true} />}
        <input
          type="text"
          placeholder="new note here..."
          value={newNote}
          id="note-input"
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit" id="save-btn">
          save
        </button>
      </form>
    </div>
  )
}

export { NoteForm }
