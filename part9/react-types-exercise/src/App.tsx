import { useState, useEffect } from 'react'
import { Note } from './types/types'
import { getAllNotes, createNote } from './services/noteService'
import './App.css'

function App() {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: 'testing' }])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {
    console.log('form submitting...')
    event.preventDefault()

    createNote({ content: newNote }).then((data) => {
      setNotes(notes.concat(data))
    })

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
