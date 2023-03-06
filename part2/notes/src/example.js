import React, { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(10);

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who);
    };
    return handler;
    // shorter syntax
    // return () => {
    //   console.log(`hello ${who}`)
    // }
  };

  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  );
};

const AppTwo = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log('value now', newValue);
    setValue(newValue);
  };

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  );
};
