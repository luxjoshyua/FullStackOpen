import { useEffect, useRef, useState } from 'react'
// import Blog from './components/Blog';
import { Blogs } from './components/Blogs'
import { LoginForm } from './components/LoginForm'
import { Togglable } from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const loginFormRef = useRef()

  // handle first loading of the page
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      //  parse the JSON string back to a JavaScript object
      const user = JSON.parse(loggedUserJSON)
      // set the user stored in localStorage to the app state
      setUser(user)
      blogService.setToken(user.token)
    }
  }, []) // call the effect function only once when the component is rendered for the first time

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      // if login is successful, the user object is saved to the state
      // and the username and password fields are cleared
      const user = await loginService.login({ username, password })
      // save token to browser's local storage
      // convert the object to a DOM string with JSON.stringify()
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      // save successful user login to app state
      setUser(user)
    } catch (exception) {
      console.log(`login error: ${exception}`)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.clear()
      setUser(null) // user still in state, may be a problem ?
    } catch (exception) {
      console.log(`logout error: ${exception}`)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        message={errorMessage}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {!user && loginForm()}
      <Blogs user={user} logout={handleLogout} />
    </div>
  )
}

export default App
