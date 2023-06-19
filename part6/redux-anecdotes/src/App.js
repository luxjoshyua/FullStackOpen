import AnectodeForm from './components/AnectodeForm'
import AnectodeList from './components/AnectodeList'

const App = () => {
  // const anecdotes = useSelector((state) => state)
  // const anecdotes = useSelector((state) => state.sort((a, b) => b.votes - a.votes))

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeList />
      <AnectodeForm />
    </div>
  )
}

export default App
