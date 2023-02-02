import React from 'react';

const Person = ({ person: { name, number } }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};

export { Person };
