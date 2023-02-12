import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const handleFilter = ({}) => {
  // check if search value has length
  // if the searchValue,.length === 1,just return that country, otherwise do a filter of the countries
  // then do filter to match === country
  // const filtered = return null
};

function App() {
  // handle the search
  const [value, setValue] = useState('');
  // handle the fetch all data
  const [allCountries, setAllCountries] = useState(null);
  // handle the single country we want to display - prolly store in country component
  const [country, setCountry] = useState('');

  // useEffect to set all countries in data
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setAllCountries(response.data);
    });
  }, [country]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCountry(value);
    handleFilter();
    // maybe move all this handle filter functionality into here ?
  };

  const handleFilter = () => {
    const filteredMatch = allCountries.filter((c) => {
      if (c.name.common.toLowerCase() === country.toLowerCase()) {
        console.log('we have a match, show country component?');
      } else {
        console.log('no match, show some other component?');
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input type="text" onChange={handleChange} />
      </form>

      <h1>country app</h1>
      {/* country component here */}
    </div>
  );
}

export default App;
