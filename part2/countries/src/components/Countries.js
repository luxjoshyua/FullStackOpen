import Country from './Country';

const Countries = ({ country }) => {
  if (country.length > 10) {
    console.log('too many countries');
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (country.length > 1 && country.length <= 10) {
    console.log('more than 1 country, less than or equal to 10');
    return (
      <div>
        {country.map((c, index) => (
          <p key={index}>{c.name.common}</p>
        ))}
      </div>
    );
  } else if (country.length === 1) {
    console.log('show normal single country map');
    return (
      <>
        <p>One country matched!</p>
        <Country country={country} />
      </>
    );
  }
};

export { Countries };
