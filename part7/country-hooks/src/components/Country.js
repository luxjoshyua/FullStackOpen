const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        <p>not found...</p>
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>
        <strong>capital</strong>: {country.data.capital[0]}{' '}
      </div>
      <div>
        <strong>population</strong>: {country.data.population}
      </div>
      <img src={country.data.flags.png} height="100" alt={`flag of ${country.data.name.common}`} />
    </div>
  )
}

export default Country
