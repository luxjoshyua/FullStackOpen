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
// do the blogs sort here
export const initialiseBlogs = () => {
	return async (dispatch) => {
		// fetch all blogs from the server
		const blogs = await blogService.getAll()
		// sort the blogs here so doesn't crash app
		// const sortedBlogs = blogs.sort((a, b) => (b.likes = a.likes))
		// console.log(blogs)
		// dispatch the set action with the blogs we received from the server, adding them to the redux store
		// dispatch(set(sortedBlogs))
		dispatch(set(blogs))
	}
}

// createBlog
// use the add in here
export const createBlog = (content) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(content)
		dispatch(add(newBlog))
	}
}

// likeBlog
// use the like in here
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
// use the remove in here
export const removeBlog = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog.id)
		dispatch(remove(blog.id))
	}
}

export const { set, add, like, remove } = blogSlice.actions

export default blogSlice.reducer
