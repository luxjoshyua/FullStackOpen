import Header from './components/Header'
import Content from './components/Content'
import TotalExercises from './components/Total'

const App = () => {
  const courseName = 'Half Stack application development'

  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return (
    <div>
      <Header heading={courseName} />
      <Content courseParts={courseParts} />
      <TotalExercises total={totalExercises} />
    </div>
  )
}

export default App
