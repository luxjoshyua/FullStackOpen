import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

// const notesUrl = `http://localhost:3005/notes`
// const personsUrl = `http://localhost:3005/persons`

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const dataFetch = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    dataFetch()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    // spread all of the individual resources in, then the response.data
    setResources([...resources, response.data])
  }

  // const update = async (id, resource) => {
  //   const response = await axios.put(`${notesUrl}/${id}`, resource)
  //   return response.data
  // }

  const service = {
    create,
    // update, delete etc goes here if creating more
  }

  // returns an array of two items []:
  // all of the individual resources
  // an object that can be used for manipulating the resource collection, like creating new ones
  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource(`http://localhost:3005/notes`)
  const [persons, personService] = useResource(`http://localhost:3005/persons`)

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
