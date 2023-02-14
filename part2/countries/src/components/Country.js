import React, { useState } from 'react';
import { CountryInfo } from './CountryInfo';

const Country = ({ country }) => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  return (
    <>
      <li style={{ marginBottom: '1rem' }}>
        {country.name.common} <button onClick={handleClick}>show country</button>
        {state && <CountryInfo country={country} />}
      </li>
    </>
  );
};

export { Country };
