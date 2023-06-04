import { useState } from 'react'
import { Notification } from './Notification'

const NoteForm = ({ createNote, successMessage }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  return (
    <div>
      <p>Create a new note</p>
      <form onSubmit={addNote} style={{ marginBottom: '.5rem' }}>
        {successMessage && <Notification message={successMessage} success={true} />}
        <input
          type="text"
          placeholder="new note here..."
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export { NoteForm }
