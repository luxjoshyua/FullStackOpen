const CountryInfo = ({ country }) => {
  return (
    <div>
      <p>
        <b>Country name: </b>
        {country.name.common}
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
  );
};

export { CountryInfo };
