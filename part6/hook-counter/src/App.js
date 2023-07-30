import { useContext, useReducer } from 'react'
import { CounterContext } from './CounterContext'
import { Display } from './Components/Display'
import { Button } from './Components/Button'

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <Display counter={counter} />
      <div>
        <Button dispatch={counterDispatch} type="INC" label="+" />
        <Button dispatch={counterDispatch} type="DEC" label="-" />
        <Button dispatch={counterDispatch} type="ZERO" label="0" />
      </div>
    </div>
  )
}

export default App
