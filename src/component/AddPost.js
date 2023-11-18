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
		<div className="bg-blue-300 h-full min-h-screen min-w-[250px]">
			<input
				type="text"
				placeholder="Enter Title Here"
				onChange={TitleHandler}
				value={title}
			></input>
			{/* <input
				type="text"
				placeholder="Enter Message Here"
				onChange={DescHandler}
				value={desc}
			></input> */}
			<input
				type="file"
				accept="image/*"
				placeholder="Enter Message Here"
				onChange={ImgHandler}
			></input>
			<div onClick={AddHandler}>ADD</div>
		</div>
	);
};

export default AddPost;
