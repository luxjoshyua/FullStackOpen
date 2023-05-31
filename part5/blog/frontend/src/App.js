import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import { BlogForm } from './components/BlogForm';
import { LoginForm } from './components/LoginForm';
import { Togglable } from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);
  // const [error, setError] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    blogService
      .getAll()
      // .then((blogs) => setBlogs(blogs));
      .then((blogs) => {
        let sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);
      });
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
      console.log(`error: ${exception}`);
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

    // blogService.create(blogObject).then((returnedBlog) => {
    //   setBlogs(blogs.concat(returnedBlog));
    // });

    blogService.create(blogObject).then((returnedBlog) => {
      const allBlogs = blogs.concat(returnedBlog);
      let sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  };

  const updateBlog = (blogObject) => {
    blogService.update(blogObject.id, blogObject).then((returnedBlog) => {
      setBlogs(blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog)));
    });
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} errorMessage={errorMessage} />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        errorMessage={errorMessage}
      />
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
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
