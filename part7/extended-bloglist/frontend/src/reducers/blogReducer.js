import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	// empty state on initialisation, then populate with db data
	initialState: [],
	reducers: {
		// set
		set(state, action) {
			return action.payload
		},
		// add
		add(state, action) {
			const blog = action.payload
			state.push(blog)
		},

		// like
		like(state, action) {
			const id = action.payload
			const blogToChange = state.find((blog) => blog.id === id)
			const changedBlog = {
				...blogToChange,
				likes: blogToChange.votes + 1
			}
			// console.log(JSON.parse(JSON.stringify(state)))
			return state.map((blog) => (blog.id !== id ? changedBlog : blog))
		},
		// remove
		remove(state, action) {
			const blogToRemove = action.payload
			return state.filter((blog) => blog.id !== blogToRemove)
		}
	}
})

// initialiseBlogs
// use the set in here

// createBlogs
// use the add in here

// likeBlog
// use the like in here

// removeBlog
// use the remove in here

export const { set, add, like, remove } = blogSlice.actions
