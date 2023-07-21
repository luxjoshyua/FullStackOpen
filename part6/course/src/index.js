import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // application's store is given to the Provider as its attribute store
  <Provider store={store}>
    <App />
  </Provider>
)
