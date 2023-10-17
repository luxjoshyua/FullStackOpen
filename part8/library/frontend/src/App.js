import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'
import { Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { ALL_AUTHORS } from './queries/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Menu from './components/Menu'
import Home from './components/Home'
import Notify from './components/Notify'
import Loading from './components/Loading'
import ErrorComponent from './components/Error'
import LoginForm from './components/LoginForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  // const { loading, error, data } = useQuery(ALL_AUTHORS)
  // console.log(`data from allAuthors call: ${JSON.stringify(data)}`)
  const result = useQuery(ALL_AUTHORS)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const navigate = useNavigate()

  if (result.loading) return <Loading />
  if (result.error) return <ErrorComponent />

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  // return (
  //   <Container>
  //     <Notify errorMessage={errorMessage} />
  //     <Menu />
  //     <Routes>
  //       <Route path="/authors" element={<Authors setError={notify} />} />
  //       <Route path="/books" element={<Books />} />
  //       <Route path="/add" element={<NewBook setError={notify} />} />
  //       <Route path="/" element={<Home />} />
  //     </Routes>
  //   </Container>
  // )

  return (
    <Container>
      <Notify errorMessage={errorMessage} />
      <Menu setError={notify} token={token} setToken={setToken} logout={logout} />
      <Routes>
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Container>
  )
}

export default App
