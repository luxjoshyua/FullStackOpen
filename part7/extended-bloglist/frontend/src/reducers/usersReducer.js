import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/users'

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		set(state, action) {
			return action.payload
		}
	}
})

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await blogService.getAll()
		dispatch(set(users))
	}
}

export const { set } = usersSlice.actions
export default usersSlice.reducer
