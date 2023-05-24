const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li style={{ marginBottom: '.5rem' }}>
      {note.content}
      <button onClick={toggleImportance} style={{ marginLeft: '.25rem' }}>
        {label}
      </button>
    </li>
  );
};

export { Note };
