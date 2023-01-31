import { Part } from './Part';
import { Header } from './Header';

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </ul>
  );
};

const TotalExercises = ({ parts }) => {
  const nums = parts.map((part) => {
    // if part has no exercise number, check so don't get NaN
    return part.exercises === undefined ? null : part.exercises;
  });
  const total = nums.reduce((sum, num) => sum + num, 0);
  return <p style={{ fontWeight: '700' }}>Total of {total} exercises</p>;
};

const Course = ({ course: { name, parts } }) => {
  return (
    <div className="container">
      <Header name={name} />
      <Content parts={parts} />
      <TotalExercises parts={parts} />
    </div>
  );
};

export { Course };
