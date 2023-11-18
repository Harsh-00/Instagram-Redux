import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("post/fetchData", async () => {
	const res = await fetch(
		"https://api.slingacademy.com/v1/sample-data/photos?limit=20"
	);
	const data = await res.json();
	console.log(data);
	return data.photos;
});

const postSlice = createSlice({
	name: "post",
	initialState: { allPost: [], status: "ideal", error: null },
	reducers: {
		addPost(state, action) {
			state.allPost.push(action.payload);
		},
		removePost(state, action) {},
		likePost(state, action) {},
		savePost(state, action) {},
		sharePost(state, action) {},
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
			.addCase(fetchData.pending, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { addPost, removePost } = postSlice.actions;
export default postSlice.reducer;
