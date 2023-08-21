import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', error: false }

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		updateNotification(state, action) {
			return { message: action.payload.message, error: action.payload.error }
		},
		clearNotification() {
			return initialState
		}
	}
})

let previousTimeoutId
export const setNotification = (text, error = false, displayTime = 5000) => {
	return (dispatch) => {
		clearTimeout(previousTimeoutId)
		dispatch(updateNotification({ message: text, error }))
		previousTimeoutId = setTimeout(() => dispatch(clearNotification()), displayTime)
	}
}

export const { updateNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
