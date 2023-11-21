import Header from './components/Header'
import Content from './components/Content'
import TotalExercises from './components/Total'
// import { CoursePart } from './components/Content'
import { assertNever } from './utilities'

const App = () => {
  const courseName = 'Half Stack application development'

  interface CoursePartBase {
    name: string
    exerciseCount: number
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string
  }

  interface CoursePartBasic extends CoursePartBase {
    kind: 'basic'
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number
    kind: 'group'
  }

  interface CoursePartBackground extends CoursePartBase {
    backgroundMaterial: string
    kind: 'background'
  }

  type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case 'basic':
        return (
          <div>
            <span>{part.name}</span>
            <span>{part.exerciseCount}</span>
            <span>{part.description}</span>
          </div>
        )
      case 'group':
        return (
          <div>
            <span>{part.name}</span>
            <span>{part.exerciseCount}</span>
            <span>{part.description}</span>
          </div>
        )
      case 'background':
        return (
          <div>
            <span>{part.name}</span>
            <span>{part.exerciseCount}</span>
            <span>{part.description}</span>
            <span>{part.backgroundMaterial}</span>
          </div>
        )
      default:
        return assertNever(part)
    }
  }

  return (
    <div>
      <Header heading={courseName} />
      {/* <Content courseParts={courseParts} /> */}
      <Part />
      <TotalExercises total={totalExercises} />
    </div>
  )
}

export default App
