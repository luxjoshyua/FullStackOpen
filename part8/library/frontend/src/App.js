import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER } from './queries/queries'
import { updateCache } from './utilities'
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
  const { data: user, refetch } = useQuery(USER)
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
    if (user) {
      setFavoriteGenre(user?.me?.favoriteGenre)
    }
  }, [user])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      //   return {
      //     allBooks: allBooks.concat(addedBook),
      //   }
      // })
    },
  })

  if (result.loading) return <Loading />
  if (result.error) return <ErrorComponent />

  // force data refresh when user clicks recommendation button
  const handleClick = () => {
    refetch()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    // resets the cache entirely
    // to reset cache without refetching active queries, use client.clearStore()
    // https://www.apollographql.com/docs/react/caching/advanced-topics/
    client.resetStore()
    setPage('authors')
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
            <button
              onClick={() => {
                setPage('recommend')
                handleClick()
              }}>
              recommend
            </button>
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
