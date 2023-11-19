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
		<div className="bg-blue-300 min-h-screen min-w-[260px] py-5 pl-3 flex flex-col gap-3  max-[450px]:hidden">
			<div className=" self-center font-semibold text-lg pb-1 mb-4 border-b-2 border-black w-fit ">
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
				className=" self-center px-4 py-1  mt-5  hover:opacity-[0.9] cursor-pointer w-fit bg-purple-400  rounded-xl font-semibold  hover:bg-purple-700 hover:text-white"
			>
				ADD
			</div>
		</div>
	);
};

export default AddPost;
