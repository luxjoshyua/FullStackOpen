import { useState } from 'react';
import { Person } from './components/Person';

const Heading = ({ title }) => <h2>{title}</h2>;

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 1 }]);
  const [newName, setNewName] = useState('');

  const addNote = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      id: persons.length + 1,
    };

    const duplicate = persons.some((person) => person.name === newName);

    if (duplicate) {
      alert(`Oh no, you've already entered: ${newName}!`);
      return;
    }

    setPersons(persons.concat(personObject));

    // clear input field on submit
    setNewName('');
  };

  return (
    <div>
      <Heading title="Phonebook" />
      <form onSubmit={addNote}>
        <div>
          {/* name: <input placeholder="add name here" onChange={handleNoteChange} /> */}
          name:{' '}
          <input
            placeholder="add name here"
            onChange={(event) => setNewName(event.target.value)}
            value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Heading title="Numbers" />
      <div>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
