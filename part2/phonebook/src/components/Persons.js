import { Person } from './Person';

const Persons = ({ persons, onClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} onClick={onClick} />
      ))}
    </div>
  );
};

export { Persons };
