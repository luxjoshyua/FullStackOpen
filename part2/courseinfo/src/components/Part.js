const Part = ({ part }) => {
  return (
    <li>
      <span className="exercise-name">{part.name}</span>
      <span className="exercise-part">{part.exercises}</span>
    </li>
  );
};

export { Part };
