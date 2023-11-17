interface CoursePart {
  name: string
  exerciseCount: number
}

interface CourseProps {
  courseParts: CoursePart[]
}

const Content = (props: CourseProps) => {
  const { courseParts } = props

  const courseItems = courseParts.map((course, index) => (
    <li key={index}>
      {course.name} {course.exerciseCount}
    </li>
  ))

  return (
    <>
      <ul>{courseItems}</ul>
    </>
  )
}

export default Content
