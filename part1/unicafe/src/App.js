import { useState } from 'react';
import './App.css';

// Header
const Header = ({ title }) => <h1>{title}</h1>;

// Button
const Button = ({ name, onClick }) => {
  // listten if the  button has been clicked
  const hasValue = true;
  return <button onClick={onClick}>{name}</button>;
};

// Statistics
const Statistics = ({ name, value }) => {
  // console.log(value);

  return (
    <p>
      {name}: {value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to their own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(true);
  }

  return (
    <div>
      <Header title="Give Feedback" />
      <Button
        name="good"
        onClick={() => {
          setGood(good + 1);
          handleClick();
        }}
      />
      <Button
        name="neutral"
        onClick={() => {
          setNeutral(neutral + 1);
          handleClick();
        }}
      />
      <Button
        name="bad"
        onClick={() => {
          setBad(bad + 1);
          handleClick();
        }}
      />
      <Header title="Statistics" />
      {isClicked === false ? (
        <p>No feedback given</p>
      ) : (
        <>
          <Statistics name="good" value={good} />
          <Statistics name="neutral" value={neutral} />
          <Statistics name="bad" value={bad} />
          <Statistics name="all" value={good + neutral + bad} />
          <Statistics name="average" value={((good - bad) / (good + neutral + bad)).toFixed(2)} />
          <Statistics
            name="positive"
            value={((good / (good + neutral + bad)) * 100).toFixed(2) + `%`}
          />
        </>
      )}
    </div>
  );
};

export default App;
