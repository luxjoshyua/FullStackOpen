import { useState } from 'react';
import './App.css';

// Header
const Header = ({ title }) => <h1>{title}</h1>;

// Button
const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

// Statistics
const Statistics = ({ name, value }) => (
  <p>
    {name}: {value}
  </p>
);

const App = () => {
  // save clicks of each button to their own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title="Give Feedback" />
      {/* Buttons in a wrapper */}
      <Button name="good" onClick={() => setGood(good + 1)} />
      <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setBad(bad + 1)} />
      <Header title="Statistics" />
      <Statistics name="good" value={good} />
      <Statistics name="neutral" value={neutral} />
      <Statistics name="bad" value={bad} />
      <Statistics name="all" value={good + neutral + bad} />

      {/* need these in percentages */}
      <Statistics name="average" value={((good - bad) / (good + neutral + bad)).toFixed(2)} />

      {/* need these in percentages */}

      <Statistics
        name="positive"
        value={((good / (good + neutral + bad)) * 100).toFixed(2) + `%`}
      />
    </div>
  );
};

export default App;
