import React, { useState } from 'react';
import { Details } from './Details';

const Country = ({ country }) => {
  const [showComponent, setShowComponent] = useState(false);

  const toggleComponent = () => setShowComponent(!showComponent);

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        {country.name.common} <button onClick={toggleComponent}>show country</button>
        {showComponent ? <Details country={country} /> : null}
      </div>
    </>
  );
};

export { Country };
