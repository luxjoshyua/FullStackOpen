import { useState, useEffect } from 'react';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Heading } from './components/Heading';
import { getAll, create, handleDelete, update } from './services/utilities';

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

  // update existing user
  const handleUpdate = () => {
    const pNewName = persons.find((p) => p.name === newName);
    const pNewNum = persons.find((n) => n.number === newNumber);

    if (!pNewName || !pNewName) {
      return false;
    }

    let match = null;
    for (const person of persons) {
      if (person.name === newName) {
        match = person;
      }
    }

    const confirm = window.confirm(
      `${pNewName.name} is already added to phonebook, replace the old number with a new one?`
    );
    if (match) {
      if (!confirm) {
        return false;
      }
    }

    const p = pNewName || pNewNum;
    const id = p.id;

    update(id, { ...p, name: newName, number: newNumber })
      .then((updatedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : updatedPerson)));
        // setNewName('');
        // setNewNumber('');
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // normal add new user
  const addNote = (event) => {
    event.preventDefault();
    if (handleUpdate() === true) {
      return;
    }

    const personObjectNew = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    create(personObjectNew).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      // clear input fields after submission
      setNewName('');
      setNewNumber('');
    });
  };

  const deleteUser = (id) => {
    handleDelete(id).then((response) => {
      const filteredPersonArr = persons.filter((p) => p.id !== id);
      const personDel = persons.filter((p) => p.id === id);
      const name = personDel[0].name;
      window.confirm(`Delete ${name} name?`);
      setPersons(filteredPersonArr);
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
