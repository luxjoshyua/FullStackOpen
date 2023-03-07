import React, { useState, useEffect } from 'react';
import { Note } from './components/Note';
import { Notification } from './components/Notification';
import { Footer } from './components/Footer';
import noteService from './services/notes';

const App = () => {
  // initialise with the initial notes array passed in the props
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // perform side-effect
  // calls/executes immediately on render
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault(); // prevent default action of submitting the form, reloading the page
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // don't include id property as it's better to let the server generate ids for our resources
      // id: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // conditional rendering, resolve problem of notes being null on initial load
  // if (!notes) {
  //   return null;
  // }

  // const toggleImportanceOf = (id) => {
  //   console.log(`importance of ${id} needs to be toggled`);
  //   // unique url for each note resource based on its id
  //   // const url = `http://localhost:3001/notes/${id}`;
  //   const note = notes.find((n) => n.id === id);
  //   // spread into new object, flip the value of important property (from true to false, false to true), as it overrides in the spread
  //   const changedNote = { ...note, important: !note.important };

  //   noteService
  //     .update(id, changedNote)
  //     .then((returnedNote) => {
  //       setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
  //     })
  //     .catch((error) => {
  //       alert(`the note ${note.content} was already deleted from server, throw ${error}`);
  //       setErrorMessage(`Note ${note.content} was already removed from server`);
  //       // reset the error message after 5 seconds
  //       setTimeout(() => {
  //         setErrorMessage(null);
  //       }, 5000);
  //       // deleted note gets filtered out from the state
  //       // filter returns new array
  //       setNotes(notes.filter((n) => n.id !== id));
  //     });
  // };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1 style={{ color: 'blue' }}>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        {/* toggle the showAll state from true to false / vice versa on click */}
        <button onClick={() => setShowAll(!showAll)}>
          {/* text changes depending on the showAll state */}
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          // each note receives its own event handler because the id of every note is unique
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            className="note"
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" placeholder="new note here..." onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
