import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_AUTHORS, USER } from './queries/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import Notify from './components/Notify'
import Loading from './components/Loading'
import ErrorComponent from './components/Error'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS)
  // need to clear the cache here somehow
  const user = useQuery(USER)
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])

  useEffect(() => {
    if (user.data) {
      setFavoriteGenre(user?.data?.me?.favoriteGenre)
    }
  }, [user.data])

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
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} style={{ paddingBottom: '.5rem' }} />
      <div style={{ display: 'flex' }}>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
          </div>
        )}
      </div>

      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify} />

      <Recommendations show={page === 'recommend'} user={user} favoriteGenre={favoriteGenre} />

      <LoginForm show={page === 'login'} setToken={setToken} setError={notify} setPage={setPage} />
    </div>
  )
}

export default App
