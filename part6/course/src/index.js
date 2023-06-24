import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import noteService from './services/notes'
import noteReducer, { setNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

noteService.getAll().then((notes) => {
  store.dispatch(setNotes(notes))
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // application's store is given to the Provider as its attribute store
  <Provider store={store}>
    <App />
  </Provider>
)
