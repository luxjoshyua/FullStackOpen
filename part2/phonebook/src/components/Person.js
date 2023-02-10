import React from 'react';

const Person = ({ person, person: { name, number }, onClick, value }) => {
  return (
    <>
      <p>
        {name} {number}
      </p>
      {!value === true ? (
        <button style={{ display: 'inline' }} onClick={() => onClick(person.id)}>
          delete
        </button>
      ) : null}
    </>
  );
};

export { Person };
