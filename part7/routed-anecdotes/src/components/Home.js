import AnecdoteList from './AnecdoteList'

const Home = ({ anecdotes }) => (
  <div>
    <h1>Software anecdotes</h1>
    <p>Blaaah blah introductory text</p>
    <AnecdoteList anecdotes={anecdotes} />
  </div>
)

export default Home
