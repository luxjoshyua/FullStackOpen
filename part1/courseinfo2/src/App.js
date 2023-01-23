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

const Total = ({ totalCourseSum }) => {
  return (
    <>
      <p>Number of exercises: {totalCourseSum} </p>
    </>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
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
  ];

  return (
    <div>
      <Header course={course} />
      <Content part={parts[0].name} exercise={parts[0].exercises} />
      <Content part={parts[1].name} exercise={parts[1].exercises} />
      <Content part={parts[2].name} exercise={parts[2].exercises} />
      <Total totalCourseSum={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  );
};

export default App;
