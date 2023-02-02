import { useState } from 'react';
import { Person } from './Person';

const Filter = ({ persons }) => {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <div style={{ paddingBottom: '.5rem' }}>
        filter shown with{' '}
        <input
          type="text"
          name="filter"
          placeholder="search person here"
          onChange={(event) => setFilter(event.target.value)}
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
            .map((person) => <Person key={person.id} person={person} />)
        )}
      </div>
    </div>
  );
};

export { Filter };
