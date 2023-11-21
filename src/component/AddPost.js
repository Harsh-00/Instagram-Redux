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
		alert("Post Added Successfully");
	}
	return (
		<div className="fixed ">
			<div className=" fixed bg-[rgba(255,255,255,0.5)] w-[260px] py-5 pl-3 flex flex-col gap-3 ml-5 rounded-3xl top-24 max-[550px]:hidden ">
				<div className=" self-center font-semibold text-lg pb-1 mb-4 border-b-2 border-black w-fit ">
					Add Post
				</div>
				<label>
					<label className="text-lg">Title:</label>
					<input
						type="text"
						placeholder="Enter Title Here"
						onChange={TitleHandler}
						value={title}
						className="ml-3 rounded-xl px-2 w-44"
					></input>
				</label>

				<label>
					<input
						type="file"
						accept="image/*"
						onChange={ImgHandler}
						className="ml-3 mt-1"
					></input>
				</label>
				<div
					onClick={AddHandler}
					className=" self-center px-6 py-1  mt-5  hover:opacity-[0.9] cursor-pointer w-fit bg-purple-400  rounded-xl border-transparent border-[2.5px] font-semibold  hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out hover:border-black"
				>
					ADD
				</div>
			</div>
			<div className="fixed bg-[rgba(255,255,255,0.5)] w-[260px] py-3 pl-3 flex flex-col gap-3 ml-5 rounded-3xl bottom-24 max-[450px]:hidden ">
				<div className=" self-center font-semibold text-lg pb-1 mb-2 border-b-2 border-black w-fit mt-6 ">
					Saved Post
				</div>
				<div
					onClick={AddHandler}
					className=" self-center px-6 py-1 mt-2 mb-5  hover:opacity-[0.9] cursor-pointer w-fit bg-purple-400  rounded-xl border-transparent border-[2.5px] font-semibold  hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out hover:border-black"
				>
					Show
				</div>
			</div>
		</div>
	);
};

export default AddPost;
