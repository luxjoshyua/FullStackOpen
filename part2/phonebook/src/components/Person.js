import React from 'react';

const Person = ({ person, person: { name, number }, onClick }) => {
  return (
    <>
      <p>
        {name} {number}
      </p>
      <button style={{ display: 'inline' }} onClick={() => onClick(person.id)}>
        delete
      </button>
    </>
  );
};

export { Person };
