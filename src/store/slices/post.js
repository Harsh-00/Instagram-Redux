import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "post",
	initialState: [],
	reducers: {
		addPost(state, action) {
			state.push(action.payload);
		},
		removePost(state, action) {},
		likePost(state, action) {},
		savePost(state, action) {},
		sharePost(state, action) {},
	},
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;
