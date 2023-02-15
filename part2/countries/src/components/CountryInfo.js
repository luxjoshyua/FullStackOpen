import WeatherInfo from './WeatherInfo';

const CountryInfo = ({ country }) => {
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
        <ul style={{ padding: '0 0 1rem 0' }}>
          <b style={{ display: 'block', padding: '0 0 1rem 0' }}>languages:</b>
          {Object.values(country.languages).map((language, index) => {
            return (
              <li style={{ marginLeft: '2rem' }} key={index}>
                {language}
              </li>
            );
          })}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      <WeatherInfo country={country} />
    </div>
  );
};

export { CountryInfo };
