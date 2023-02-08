import { useState, useEffect } from 'react';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Heading } from './components/Heading';
import { getAll, create, handleDelete } from './services/utilities';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        throw new Error(`${error} exeperienced, try again`);
      });
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const personObjectNew = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    const duplicate = persons.some((person) => person.name === newName);

    if (duplicate) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }

    create(personObjectNew).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      // clear input fields after submission
      setNewName('');
      setNewNumber('');
    });
  };

  const deleteUser = (id) => {
    console.log('button being pressed successfully!');
    const person = persons.find((p) => p.id === id);

    // run delete here
    handleDelete(id).then((person) => {
      setPersons(persons.map((person) => (person.id !== id ? person : null)));
    });
  };

  return (
    <div style={{ padding: '2vh 2vw' }}>
      <Heading title="Phonebook" />
      <Filter persons={persons} />
      <Heading title="Add a new person" />
      <PersonForm
        onSubmit={addNote}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <Heading title="Numbers" />
      <Persons persons={persons} onClick={deleteUser} />
    </div>
  );
};

export default App;
