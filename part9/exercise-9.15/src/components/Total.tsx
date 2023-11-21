interface TotalExercisesProps {
  total: number
}

const TotalExercises = (props: TotalExercisesProps) => (
  <>
    <p>
      Number of exercises: <strong>{props.total}</strong>{' '}
    </p>
  </>
)

export default TotalExercises
