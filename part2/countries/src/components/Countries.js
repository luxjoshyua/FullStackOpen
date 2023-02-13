const Countries = ({ country }) => {
  // console.log(country);
  if (!country) {
    return null;
  }

  console.log(country);

  // console.log(country);

  // title
  // area in country
  // languages map through
  // image of map
  // console.log(country.length.common);
  // console.log(country.name.common);

  // if (!country.found) {
  //   return <div>not found....</div>;
  // }

  if (country.length === 1) {
    console.log('show single country');
    return (
      <>
        <p>{country[0].name.common}</p>
        <p>{country[0].area}</p>
        <p>{country[0]}</p>
        <img src={country[0].flags.png} alt={country[0].flags.alt} />
      </>
    );
  }
};

export { Countries };
