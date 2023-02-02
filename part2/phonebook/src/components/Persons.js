import { Person } from './Person';

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

export { Persons };
