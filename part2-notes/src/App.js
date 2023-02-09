import React, { useState, useEffect } from 'react';
import { Note } from './components/Note';
import { getAll, create, update } from './services/notes';

const App = () => {
  // initialise with the initial notes array passed in the props
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // perform side-effect
  // calls/executes immediately on render
  useEffect(() => {
    // console.log('effect');
    // a promise is an object that represents an asynchronous operation
    // axios.get('http://localhost:3001/notes').then((response) => {
    //   // console.log('response fulfilled');
    //   const notes = response.data;
    //   // console.log('notes: ', notes);
    //   setNotes(notes);
    // });
    // noteService.getAll().then((response) => {
    //   setNotes(response.data);
    // });
    getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    // unique url for each note resource based on its id
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    // spread into new object, flip the value of important property (from true to false, false to true), as it overrides in the spread
    const changedNote = { ...note, important: !note.important };

    update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note ${note.content} was already deleted from server, throw ${error}`);
        // deleted note gets filtered out from the state
        // filter returns new array
        setNotes(notes.filter((n) => n.id !== id));
      });

    // axios.put(url, changedNote).then((response) => {
    //  update the notes array with all the items from the previous notes array,
    //  except for the old note which is replaced by the updated version of it returned from the server
    //  map returns a new array
    //   setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
    // });
  };

  const addNote = (event) => {
    event.preventDefault(); // prevent default action of submitting the form, reloading the page
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      // don't include id property as it's better to let the server generate ids for our resources
      // id: notes.length + 1,
    };

    // post our new noteObject to to the db, then handle the response, setting the response in our notes state
    // axios.post('http://localhost:3001/notes', noteObject).then((response) => {
    //   // concat creates a new copy of the notes array and merges the noteObject into it,
    //   // does not change the component's original state
    //   setNotes(notes.concat(response.data));
    //   // reset the value of the input field
    //   setNewNote('');
    // });

    create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // const notesToShow = showAll ? notes : notes.filter((note) => note.important === true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
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
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" placeholder="new note here..." onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
