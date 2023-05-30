import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import { BlogForm } from './components/BlogForm';
import { Notification } from './components/Notification';
import { Togglable } from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // handle first loading of the page
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      //  parse the JSON string back to a JavaScript object
      const user = JSON.parse(loggedUserJSON);
      // set the user stored in localStorage to the app state
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []); // call the effect function only once when the component is rendered for the first time

  if (!blogs) return null;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // if login is successful, the user object is saved to the state
      // and the username and password fields are cleared
      const user = await loginService.login({ username, password });
      // save token to browser's local storage
      // convert the object to a DOM string with JSON.stringify()
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      // save successful user login to app state
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    try {
      window.localStorage.clear();
      setUser(null); // user still in state, may be a problem ?
    } catch (exception) {
      setErrorMessage('Logging user out broke');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    });
  };

  const loginForm = () => (
    <form onSubmit={handleLogin} style={{ paddingBottom: '2rem' }}>
      <h2>log in to application</h2>
      {errorMessage && <Notification message={errorMessage} />}
      <div style={{ marginBottom: '.5rem' }}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <div style={{ marginBottom: '.5rem' }}>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          style={{ marginLeft: '.25rem' }}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} successMessage={successMessage} />
    </Togglable>
  );

  return (
    <div>
      <h1>Blogs</h1>

      {!user && loginForm()}

      {/* only allow logged in user to add a new blog entry */}
      {user && (
        <div>
          <div
            className="wrapper"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <p style={{ marginRight: '.5rem' }}>user {user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </div>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
