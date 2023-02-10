import { useState } from 'react';
import { Person } from './Person';
import { formatString } from '../services/utilities';

const Filter = ({ persons, onClick }) => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <div style={{ paddingBottom: '.5rem' }}>
        filter shown with{' '}
        <input
          type="text"
          name="filter"
          placeholder="search person here"
          onChange={(event) => {
            const editedString = formatString(event.target.value);
            setFilter(editedString);
          }}
          value={filter}
        />
      </div>
      <div>
        Filter results:
        {filter === '' ? (
          <p>No filter yet</p>
        ) : (
          persons
            .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map((person) => (
              <Person key={person.id} person={person} onClick={onClick} value={true} />
            ))
        )}
      </div>
    </div>
  );
};

export { Filter };
