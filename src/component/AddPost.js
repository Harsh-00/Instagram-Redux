import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../store/slices/post";

const AddPost = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	// const [desc, setDesc] = useState("");
	const [url, setUrl] = useState(null);

	function TitleHandler(ev) {
		setTitle(ev.target.value);
	}
	// function DescHandler(ev) {
	// 	setDesc(ev.target.value);
	// }

	function ImgHandler(ev) {
		if (ev.target.files && ev.target.files[0]) {
			setUrl(URL.createObjectURL(ev.target.files[0]));
		}
	}
	function AddHandler() {
		if (!title) return;
		dispatch(addPost({ title, url }));
		// setDesc("");
		setUrl(null);
		setTitle("");
	}
	return (
		<div className="bg-blue-300 h-full min-h-screen min-w-[300px] py-5 pl-3 flex flex-col gap-3">
			<div className="text-center font-semibold text-lg pb-4 ">
				Add Post
			</div>
			<label>
				Title:
				<input
					type="text"
					placeholder="Enter Title Here"
					onChange={TitleHandler}
					value={title}
					className="ml-3"
				></input>
			</label>

			<label>
				Image:
				<input
					type="file"
					accept="image/*"
					placeholder="Enter Message Here"
					onChange={ImgHandler}
				></input>
			</label>
			<div
				onClick={AddHandler}
				className="bg-gray-500 self-center px-4 py-1 rounded-xl mt-5 cursor-pointer hover:opacity-[0.9]"
			>
				ADD
			</div>
		</div>
	);
};

export default AddPost;
