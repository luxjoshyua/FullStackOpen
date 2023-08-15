const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return (
      <div>
        <p>anecdote not saved in state</p>
      </div>
    )
  }

  const { content, author, info, votes } = anecdote

  return (
    <div>
      <h2>Anecdote</h2>
      <p>Anecdote content: {content}</p>
      <p>Anecdote author: {author}</p>
      <p>Anecdote info: {info}</p>
      <p>Anecdote votes: {votes}</p>
    </div>
  )
}

export default Anecdote
