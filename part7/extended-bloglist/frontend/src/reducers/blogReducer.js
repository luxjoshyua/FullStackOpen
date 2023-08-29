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
			return state.map((blog) => (blog.id === id ? changedBlog : blog))
		},
		// remove
		remove(state, action) {
			const id = action.payload
			return state.filter((blog) => blog.id !== id)
		}
	}
})

// initialiseBlogs
export const initialiseBlogs = () => {
	return async (dispatch) => {
		// fetch all blogs from the server
		const blogs = await blogService.getAll()
		dispatch(set(blogs))
	}
}

// createBlog
export const createBlog = (content) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(content)
		dispatch(add(newBlog))
	}
}

// likeBlog
export const likeBlog = (blog) => {
	return async (dispatch) => {
		await blogService.update(blog.id, {
			...blog,
			user: blog.user.id,
			likes: blog.likes + 1
		})
		dispatch(like(blog.id))
	}
}

// removeBlog
export const removeBlog = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog.id)
		dispatch(remove(blog.id))
	}
}

export const { set, add, like, remove } = blogSlice.actions

export default blogSlice.reducer
