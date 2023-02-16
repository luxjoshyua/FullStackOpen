import { WeatherInfo } from './WeatherInfo';
import { CountryLanguages } from './CountryLanguages';

const Details = ({ country }) => {
  return (
    <div>
      <div style={{ paddingBottom: '2rem' }}>
        <h4 style={{ fontSize: '2rem', margin: '.5rem 0' }}>{country.name.common}</h4>
        <p>
          <b>Country capital: </b>
          {country.capital[0]}
        </p>
        <p>
          <b>Country area:</b> {country.area}
        </p>
        <div>
          <b style={{ display: 'block' }}>languages:</b>
          <CountryLanguages languages={country.languages} />
        </div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <WeatherInfo country={country} />
    </div>
  );
};

export { Details };
