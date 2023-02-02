import { useState } from 'react';
import { Person } from './components/Person';
import { Filter } from './components/Filter';
import { testData } from './testData';

const Heading = ({ title }) => <h2>{title}</h2>;

const App = () => {
  const [persons, setPersons] = useState(testData);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addNote = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    const duplicate = persons.some((person) => person.name === newName);

    if (duplicate) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }

    setPersons(persons.concat(personObject));

    // clear input field on submit
    setNewName('');
    setNewNumber('');
  };

  return (
    <div style={{ padding: '2vh 2vw' }}>
      <Heading title="Phonebook" />
      <Filter persons={persons} />

      <Heading title="Add a new person" />
      <form onSubmit={addNote}>
        <div style={{ paddingBottom: '.5rem' }}>
          name:{' '}
          <input
            type="text"
            placeholder="add name here"
            onChange={(event) => setNewName(event.target.value.toLowerCase())}
            value={newName}
          />
        </div>
        <div style={{ paddingBottom: '.5rem' }}>
          number:{' '}
          <input
            type="number"
            placeholder="add number here"
            onChange={(event) => setNewNumber(event.target.value)}
            // aus format
            pattern="[0]{1}[0-9]{9}"
            value={newNumber}
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
