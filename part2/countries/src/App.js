import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return { type, value, onChange };
};

const useCountryFilter = (value) => {
  const [countries, setCountries] = useState([]);

  // useEffect to set all countries in data
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(`Error caught in data fetch: ${error}`);
      });
  }, []);

  let country =
    value !== ''
      ? countries.filter(
          (country) => country.name.common.toLowerCase().indexOf(value.toLowerCase()) !== -1
        )
      : countries;

  return country;
};

const Country = ({ country }) => {
  // console.log(country);

  return (
    <div>
      <h1>country component</h1>
      {country.length === 1 && (
        <div>
          <p>normal single country component</p>
        </div>
      )}
    </div>
  );
};

function App() {
  // handle the search
  const countryInput = useField('text');
  const { value } = countryInput;

  const [name, setName] = useState('');

  const country = useCountryFilter(value);

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
      <Country country={country} />
    </div>
  );
}

export default App;
