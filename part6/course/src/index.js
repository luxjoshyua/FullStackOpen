import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// combineReducers turns an object whose values are different reducing functions into a
// single reducing function we can then pass to createStore
// every action gets handled in every part of the combined reducer
// https://redux.js.org/api/combinereducers
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // application's store is given to the Provider as its attribute store
  <Provider store={store}>
    <App />
  </Provider>
)
