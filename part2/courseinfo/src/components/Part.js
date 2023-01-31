const Part = ({ part }) => {
  return (
    <li>
      <span className="exercise-name" style={{ paddingRight: '0.5em' }}>
        {part.name}
      </span>
      <span className="exercise-part">{part.exercises}</span>
    </li>
  );
};

export { Part };
