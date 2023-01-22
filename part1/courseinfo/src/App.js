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
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercise={exercises1} />
      <Content part={part2} exercise={exercises2} />
      <Content part={part3} exercise={exercises3} />
      <Total totalCourseSum={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
