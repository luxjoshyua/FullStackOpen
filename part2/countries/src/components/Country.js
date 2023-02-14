const Country = ({ country }) => {
  return (
    <div>
      <p>Country name: {country[0].name.common}</p>
      <p>Country area: {country[0].area}</p>
      <ul>languages:</ul>
      {Object.values(country[0].languages).map((language, index) => {
        return <li key={index}>{language}</li>;
      })}
      <img src={country[0].flags.png} alt={country[0].flags.alt} />
    </div>
  );
};

export default Country;
