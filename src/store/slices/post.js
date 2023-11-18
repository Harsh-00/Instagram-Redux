import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("post/fetchData", async () => {
	const res = await fetch(
		"https://api.slingacademy.com/v1/sample-data/photos?limit=16"
	);
	const data = await res.json();
	console.log(data);
	return data.photos;
});

const postSlice = createSlice({
	name: "post",
	initialState: {
		allPost: [],
		status: "ideal",
		error: null,
		user: false,
		userInfo: null,
	},
	reducers: {
		addPost(state, action) {
			state.allPost.push(action.payload);
		},
		deletePost(state, action) {
			state.allPost.splice(action.payload, 1);
		},
		likePost(state, action) {},
		savePost(state, action) {},
		sharePost(state, action) {},
		loggedIn(state, action) {
			state.user = true;
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.allPost = action.payload;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { addPost, deletePost, loggedIn } = postSlice.actions;
export default postSlice.reducer;
