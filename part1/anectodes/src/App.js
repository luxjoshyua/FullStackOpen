import { useState } from 'react';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Heading = ({ text }) => <h2>{text}</h2>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  // so the initial phrase is always random
  const [selected, setSelected] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [highestNumber, setHighestNumber] = useState(0);

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
    // never mutate state directly so make a copy
    const copyOfVotesArray = [...votes];
    // increase for the selected anectode
    copyOfVotesArray[selected] += 1;
    setVotes(copyOfVotesArray);

    // set the highest voted number
    const highest = Math.max(...copyOfVotesArray);
    setHighestNumber(highest);
  };

  const mostVoted = anecdotes[votes.indexOf(Math.max(...votes))];

  return (
    <div>
      {isClicked === false ? (
        <>
          <p>Please click button to use app</p>
          <Button text="Click for anectodes" onClick={handleInitialClick} />
        </>
      ) : (
        <div>
          <>
            <Heading text="Anectode of the day" />
            <p>{anecdotes[selected]}</p>
            <p>Anectode has {votes[selected]} number of votes</p>
            <Button text="vote" onClick={handleVoteChange} />
            <Button text="Next anectode" onClick={handleMoreClick} />
          </>
          <>
            <Heading text="Anectode with most votes" />
            <p>{mostVoted}</p>
            <p>Has {highestNumber} votes</p>
          </>
        </div>
      )}
    </div>
  );
};

export default App;
