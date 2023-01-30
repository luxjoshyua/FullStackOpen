import { useState } from 'react';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    // 0
    'If it hurts, do it more often.',
    // 1
    'Adding manpower to a late software project makes it later!',
    // 2
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    // 3
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    // 4
    'Premature optimization is the root of all evil.',
    // 5
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    // 6
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    // 7
    'The only way to go fast, is to go well.',
  ];

  // const randomNum = Math.floor(Math.random() * anecdotes.length);

  // so the initial phrase is always random
  const [selected, setSelected] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const handleInitialClick = () => {
    setIsClicked(true);
  };

  const handleMoreClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const points = new Array(8).fill(0);
  const [votes, setVotes] = useState(points);
  const handleVoteChange = () => {
    // never mutate state directly
    const copyOfVotesArray = [...votes];
    copyOfVotesArray[selected] += 1;
    setVotes(copyOfVotesArray);
  };

  return (
    <div>
      {isClicked === false ? (
        <>
          <p>Please click button to use app</p>
          <Button text="Click for anectodes" onClick={handleInitialClick} />
        </>
      ) : (
        <div>
          {/* do two separate components for different sections */}
          <p>{anecdotes[selected]}</p>
          <p>Anectode has {votes[selected]} number of votes</p>
          <Button text="vote" onClick={handleVoteChange} />
          <Button text="Next anectode" onClick={handleMoreClick} />
        </div>
      )}
    </div>
  );
};

export default App;
