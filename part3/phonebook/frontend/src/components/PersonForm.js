import React from 'react';
import { formatString } from '../services/utilities';

const PersonForm = ({ onSubmit, setNewName, newName, setNewNumber, newNumber }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ paddingBottom: '.5rem' }}>
          name:{' '}
          <input
            placeholder="Name must be at least 3 characters in length"
            onChange={(event) => {
              const editedString = formatString(event.target.value);
              setNewName(editedString);
            }}
            value={newName}
          />
        </div>
        <div style={{ paddingBottom: '.5rem' }}>
          number:{' '}
          <input
            placeholder="Number must be at least 8 characters in length, and the first part must have between 2 and 3 characters e.g. 12-3456789 or 123-456789"
            onChange={(event) => setNewNumber(event.target.value)}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export { PersonForm };
