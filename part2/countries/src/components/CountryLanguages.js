const CountryLanguages = ({ languages }) => {
  return (
    <>
      {Object.values(languages).map((language, index) => {
        return (
          <div key={index}>
            <p>{language}</p>
          </div>
        );
      })}
    </>
  );
};

export { CountryLanguages };
