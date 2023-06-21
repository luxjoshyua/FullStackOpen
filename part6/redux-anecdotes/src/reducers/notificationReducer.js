import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
  },
  reducers: {
    createNotification(state, action) {
      // return action.payload
      // console.log(action)
      // console.log(action.payload)
      state.notifications.push({
        message: action.payload,
        // id: action.payload.id,
        // type: action.payload.type,
      })
    },
    removeNotification(state, action) {
      return ''
    },
  },
})

export const { createNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer
