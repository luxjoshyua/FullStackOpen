import { useState, useEffect } from 'react';
import { Persons } from './components/Persons';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Heading } from './components/Heading';
import { Notification } from './components/Notification';
import personService from './services/utilities';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        throw new Error(`${error} experienced, try again`);
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
        handleSuccess(personObjectNew.name);
        handleInputReset();
      } else {
        handleInputReset();
      }
    } else {
      personService
        .create(personObjectNew)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          handleSuccess(returnedPerson.name);
          handleInputReset();
        })
        .catch((error) => {
          handleValidationError(error);
        });
    }
  };

  const handleInputReset = () => {
    setNewName('');
    setNewNumber('');
  };

  const handleSuccess = (name) => {
    setSuccessMessage(`Added ${name}!`);
    setSuccess(true);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const handleDelete = (name) => {
    setSuccessMessage(`Deleted ${name}!`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  const handleError = (error) => {
    setErrorMessage(
      `Error occurred, specifically status: ${error.response.status}, status text: ${error.response.statusText}`
    );
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    setError(true);
  };

  const handleValidationError = (error) => {
    setErrorMessage(error.response.data.error);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    setError(true);
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
        setPersons(persons.filter((p) => p.id !== newPersonId));
        handleError(error);
      });
  };

  const deleteUser = (id) => {
    personService.handleDelete(id).then((response) => {
      const filteredPersonArr = persons.filter((p) => p.id !== id);
      const personDel = persons.filter((p) => p.id === id);
      const name = personDel[0].name;
      const confirmMsg = `Delete ${name}?`;
      const confirmPrompt = window.confirm(confirmMsg);
      if (confirmPrompt) {
        setPersons(filteredPersonArr);
        handleDelete(name);
        handleInputReset();
      }
      return;
    });
  };

  return (
    <div style={{ padding: '2vh 2vw' }}>
      <Heading title="Phonebook" />
      {(success || error) && (
        <Notification
          message={successMessage}
          success={success}
          errorMsg={errorMessage}
          error={error}
        />
      )}
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
