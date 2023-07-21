import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

// https://redux-toolkit.js.org/api/configureStore
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
})

export default store
