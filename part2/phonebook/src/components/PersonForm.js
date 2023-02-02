const PersonForm = ({ onSubmit, setNewName, newName, setNewNumber, newNumber }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div style={{ paddingBottom: '.5rem' }}>
          name:{' '}
          <input
            type="text"
            placeholder="add name here"
            onChange={(event) => setNewName(event.target.value.toLowerCase())}
            value={newName}
          />
        </div>
        <div style={{ paddingBottom: '.5rem' }}>
          number:{' '}
          <input
            type="number"
            placeholder="add number here"
            onChange={(event) => setNewNumber(event.target.value)}
            // aus format
            pattern="[0]{1}[0-9]{9}"
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export { PersonForm };
