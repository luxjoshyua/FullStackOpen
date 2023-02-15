import { Country } from './Country';
import { CountryInfo } from './CountryInfo';

const Countries = ({ country }) => {
  const tooMany = country.length > 10;
  const middle = country.length > 1 && country.length <= 10;
  const exact = country.length === 1;

  if (!country) {
    return null;
  }

  if (tooMany) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (exact) {
    return (
      <>
        <p>One country matched!</p>
        <CountryInfo country={country[0]} />
      </>
    );
  } else if (middle) {
    return (
      <div>
        <ul>
          {country.map((c) => (
            <Country key={c.name.common} country={c} />
          ))}
        </ul>
      </div>
    );
  }
};

export { Countries };
