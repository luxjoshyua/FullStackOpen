import React from 'react';

const Person = ({ person: { name, number }, onClick }) => {
  return (
    <>
      <p>
        {name} {number}
      </p>
      <button style={{ display: 'inline' }} onClick={onClick}>
        delete
      </button>
    </>
  );
};

export { Person };
