import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import postReducer from "./slices/post";

export default configureStore({
	reducer: {
		counter: counterReducer,
		post: postReducer,
	},
});
