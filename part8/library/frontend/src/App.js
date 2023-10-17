import React, { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Container } from '@mui/material'
import { ALL_AUTHORS } from './queries/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import Home from './components/Home'
import Notify from './components/Notify'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  // const result = useQuery(ALL_AUTHORS)

  if (loading) return <div>loading....</div>
  if (error) return <div>error....</div>

  // console.log(`data from allAuthors call: ${JSON.stringify(data)}`)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <Container>
      <Notify errorMessage={errorMessage} />
      <Menu />
      <Routes>
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
