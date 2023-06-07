const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li style={{ marginBottom: '.5rem' }} className="note">
      <span style={{ display: 'block' }}>{note.content}</span>
      <button onClick={toggleImportance} style={{ marginLeft: '.25rem' }} id="important-toggle-btn">
        {label}
      </button>
    </li>
  )
}

export { Note }
