import { useState, useEffect } from 'react';
import axios from 'axios';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';

const Heading = ({ title }) => <h2>{title}</h2>;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/persons`)
      .then((response) => {
        const persons = response.data;
        setPersons(persons);
      })
      .catch((error) => {
        console.warn(`Oh no, error has occurred: `, error.message);
      });
  }, []);

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
      <PersonForm
        onSubmit={addNote}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <Heading title="Numbers" />
      <Persons persons={persons} />
    </div>
  );
};

export default App;
