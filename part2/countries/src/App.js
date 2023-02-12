import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return { type, value, onChange };
};

const useCountryFilter = (countryName) => {
  // handle the fetch all data
  const [allCountries, setAllCountries] = useState(null);
  const [country, setCountry] = useState('');

  // useEffect to set all countries in data
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      // setAllCountries(response.data);
      // maybe do all our data store here so don't save to allCountries state?
    });
  }, []);

  // const filteredMatch = allCountries.filter((c) => {
  //   if (c.name.common.toLowerCase() === country.toLowerCase()) {
  //     console.log('we have a match, show country component?');
  //   } else {
  //     console.log('no match, show some other component?');
  //   }
  // });

  // return country
};

// country component here

function App() {
  // handle the search
  const countryInput = useField('text');
  const [name, setName] = useState('');
  // handle the single country we want to display - prolly store in country component
  const country = useCountryFilter(name);

  const search = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  return (
    <div>
      <form onSubmit={search}>
        find countries <input type="text" {...countryInput} />
      </form>

      <h1>country app</h1>
      {/* country component here */}
    </div>
  );
}

export default App;
