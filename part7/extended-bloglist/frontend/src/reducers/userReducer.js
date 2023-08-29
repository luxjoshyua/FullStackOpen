import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		set(state, action) {
			return action.payload
		},
		reset() {
			return null
		}
	}
})

export const initializeUser = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(set(user))
			blogService.setToken(user.token)
		}
	}
}

export const logInUser = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({ username, password })
			blogService.setToken(user.token)
			dispatch(set(user))
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
		} catch (exception) {
			dispatch(setNotification('Wrong username or password', true))
			console.error(exception)
		}
	}
}

export const logOutUser = () => {
	return async (dispatch) => {
		dispatch(reset())
		window.localStorage.clear()
	}
}

export const { set, reset } = userSlice.actions
export default userSlice.reducer
