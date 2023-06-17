import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // application's store is given to the Provider as its attribute store
  <Provider store={store}>
    <App />
  </Provider>
)
