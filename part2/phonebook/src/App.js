import { useState, useEffect } from 'react';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Heading } from './components/Heading';
import personService from './services/utilities';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        throw new Error(`${error} exeperienced, try again`);
      });
  }, []);

  // normal add new user
  const addPerson = (event) => {
    event.preventDefault();

    const personObjectNew = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    const duplicate = persons.map((person) => person.name);

    if (duplicate.includes(newName)) {
      const confirmMsg = `${newName} is already added to phonebook, replace the old number with a new one?`;
      const confirmPrompt = window.confirm(confirmMsg);
      if (confirmPrompt) {
        update(personObjectNew);
        handleInputReset();
      } else {
        handleInputReset();
      }
    } else {
      personService.create(personObjectNew).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        handleInputReset();
      });
    }
  };

  const handleInputReset = () => {
    setNewName('');
    setNewNumber('');
  };

  // update existing user
  const update = (personObj) => {
    const newPerson = persons.find((p) => p.name === personObj.name);
    const newPersonId = newPerson.id;

    personService
      .update(newPersonId, personObj)
      .then((updatedPerson) => {
        setPersons(persons.map((p) => (p.id !== newPersonId ? p : updatedPerson)));
      })
      .catch((error) => {
        console.log(error.response);
        setPersons(persons.filter((p) => p.id !== newPersonId));
      });
  };

  // let reset = false;

  const deleteUser = (id) => {
    personService.handleDelete(id).then((response) => {
      const filteredPersonArr = persons.filter((p) => p.id !== id);
      const personDel = persons.filter((p) => p.id === id);
      const name = personDel[0].name;
      const confirmMsg = `Delete ${name}?`;
      const confirmPrompt = window.confirm(confirmMsg);

      if (confirmPrompt) {
        setPersons(filteredPersonArr);
        handleInputReset();
      } else {
        console.log('said no, reset filter');
      }
    });
  };

  return (
    <div style={{ padding: '2vh 2vw' }}>
      <Heading title="Phonebook" />
      <Filter persons={persons} onClick={deleteUser} />
      <Heading title="Add a new person" />
      <PersonForm
        onSubmit={addPerson}
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
