const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  );
};

const Content = ({ part, exercise }) => {
  return (
    <div>
      <Part part={part} exercise={exercise} />
    </div>
  );
};

// other spread syntax
// const Content = ({ ...props }) => {
//   return (
//     <div>
//       <Part {...props} />
//     </div>
//   );
// };

const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        Part: {part}, exercise: {exercise}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  const [part1, part2, part3] = parts;
  return (
    <>
      <p>Number of exercises: {part1.exercises + part2.exercises + part3.exercises}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const { name, parts } = course;
  const [part1, part2, part3] = parts;

  return (
    <div>
      <Header course={name} />
      <Content part={part1.name} exercise={part1.exercises} />
      <Content part={part2.name} exercise={part2.exercises} />
      <Content part={part3.name} exercise={part3.exercises} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
