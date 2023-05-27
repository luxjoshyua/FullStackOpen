import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Note } from './components/Note';
import { Notification } from './components/Notification';
import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
  // initialise with the initial notes array passed in the props
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // perform side-effect
  // calls/executes immediately on render
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // handle first loading of the page
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      //  parse the JSON string back to a JavaScript object
      const user = JSON.parse(loggedUserJSON);
      // set the user stored in localStorage to the app state
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []); // call the effect function only once when the component is rendered for the first time

  // important! otherwise breaks as no notee on initial render
  if (!notes) {
    return null;
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // if login is successful, the user object is saved to the state
      // and the username and password fields are cleared
      const user = await loginService.login({ username, password });
      // save token to browser's local storage
      // convert the object to a DOM string with JSON.stringify()
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      // to clear localStorage
      // by item: window.localStorage.removeItem('loggedNoteappUser');
      // totally: window.localStorage.clear();

      noteService.setToken(user.token);
      // save successful user login to app state
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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

  const loginForm = () => (
    <form onSubmit={handleLogin} style={{ paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '.5rem' }}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }}>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input type="text" placeholder="new note here..." onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

  return (
    <div>
      <h1 style={{ color: 'green' }}>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

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

      <Footer />
    </div>
  );
};

export default App;
