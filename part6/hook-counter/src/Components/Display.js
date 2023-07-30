import { useCounterValue } from '../CounterContext'

export const Display = () => {
  const counter = useCounterValue()
  return <div>{counter}</div>
}

// export default Display
