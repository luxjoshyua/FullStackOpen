import { CoursePart } from '../types'
import Part from './Part'

interface Content {
  name: string
  exerciseCount: number
}

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <div key={part.name}>
            <Part part={part} />
          </div>
        )
      })}
    </div>
  )
}

export default Content
