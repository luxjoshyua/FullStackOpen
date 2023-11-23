import { useState } from 'react'
import './App.css'

interface Note {
  id: number
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: 'testing' }])
  const [newNote, setNewNote] = useState('')

  // avoid the dreaded any error
  const noteCreation = (event: React.SyntheticEvent) => {
    console.log('form submitting...')
    event.preventDefault()
    const noteToAdd = {
      content: newNote,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteToAdd))
    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(event) => setNewNote(event.target.value)} />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
