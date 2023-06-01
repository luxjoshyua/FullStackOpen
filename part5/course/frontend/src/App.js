import React, { useEffect, useRef, useState } from 'react';

import { Footer } from './components/Footer';
import { LoginForm } from './components/LoginForm';
import { Note } from './components/Note';
import { NoteForm } from './components/NoteForm';
import { Notification } from './components/Notification';
import { Togglable } from './components/Togglable';

import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

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
  if (!notes) return null;

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

  const handleLogout = async () => {
    try {
      window.localStorage.clear();
      setUser(null); // user still in state, may be a problem ?
    } catch (exception) {
      setErrorMessage('Logging user out broke');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setSuccessMessage(
        `a new blog titled "${returnedNote.content}" by user "${user.name}" successfully added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div style={{ marginBottom: '.5rem' }}>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        {errorMessage && <Notification message={errorMessage} />}
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} successMessage={successMessage} />
    </Togglable>
  );

  console.log(`USER IN STATE`, user);

  return (
    <div>
      <h1 style={{ color: 'green' }}>Notes</h1>

      {!user && (
        <>
          <p>Please login to view note collection</p>
          {loginForm()}
        </>
      )}

      {user && (
        <div>
          <p>User {user.name} logged in</p>
          <button onClick={handleLogout} style={{ marginBottom: '.5rem' }}>
            logout
          </button>
          {noteForm()}
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
              />
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
