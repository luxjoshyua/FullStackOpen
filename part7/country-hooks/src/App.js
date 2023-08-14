import React, { useState } from 'react'

import Country from './components/Country'
import { useField, useCountry } from './hooks'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {country && <Country country={country} />}
    </div>
  )
}

export default App
