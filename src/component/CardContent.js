import React, { useState } from "react";
import { GrLike } from "react-icons/gr";
import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

import {
	commentPopup,
	deletePost,
	sharePost,
	commentPost,
} from "../store/slices/post";

const CardContent = ({ ele, idx }) => {
	// console.log("First", idx);
	const [like, setLike] = useState(false);
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post.allPost);
	// console.log("nn", posts);
	const [comment, setTxt] = useState("");
	const com = useSelector((state) => state.post.comment);
	const loginInfo = useSelector((state) => state.post.userInfo);

	function CommentHandler() {
		console.log(loginInfo);
		if (loginInfo?.name == null) {
			console.log("First Login in to Comment");
			return;
		}
		const name = loginInfo.name;

		// idx must be same as time of clicking on btn
		const commIdx = com.index;
		console.log("HERE", { commIdx, comment, name });
		dispatch(commentPost({ commIdx, comment, name }));
		dispatch(commentPopup(false));
	}
	function DelHandler(idx) {
		console.log(idx);
		dispatch(deletePost(idx));
	}

	function CommentPopHandler(index) {
		console.log("Pop", index);
		dispatch(commentPopup({ val: true, index }));
	}

	function ShareHandler() {
		dispatch(sharePost(true));
	}

	return (
		<div className=" bg-purple-300 flex flex-col max-h-[400px] pb-3 rounded-xl relative">
			<div className="absolute top-2 right-2 text-xl cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out text-white">
				<FaRegBookmark />
			</div>

			<img
				src={ele.url}
				className="w-full object-center object-contain max-h-[262px] rounded-xl transition-all duration-300 ease-in-out"
			></img>
			<div className="flex flex-col  justify-between h-full pl-1 text-lg">
				<div>{ele.title}</div>

				<div className="flex mt-4 justify-evenly items-baseline">
					{like === true ? (
						<FcLike
							className=" cursor-pointer text-xl hover:scale-125 transition-all duration-300 ease-in-out"
							onClick={() => setLike(!like)}
						></FcLike>
					) : (
						<GrLike
							className="cursor-pointer  hover:scale-125 transition-all duration-300 ease-in-out"
							onClick={() => setLike(!like)}
						></GrLike>
					)}
					<div className="inline-flex justify-center items-baseline gap-2">
						<p className="text-xl font-semibold">
							{posts[idx].comment != null
								? `${posts[idx].comment.length}`
								: ""}
						</p>
						<FaComment
							className="cursor-pointer hover:scale-125 text-xl transition-all duration-300 ease-in-out"
							onClick={() => CommentPopHandler(idx)}
						></FaComment>
					</div>

					<FaShare
						className="cursor-pointer text-xl hover:scale-125 transition-all duration-300 ease-in-out "
						onClick={ShareHandler}
					></FaShare>
					<MdOutlineDelete
						onClick={() => DelHandler(idx)}
						className="cursor-pointer hover:scale-125 text-xl transition-all duration-300 ease-in-out"
					>
						Delete
					</MdOutlineDelete>
				</div>
			</div>
		</div>
	);
};

export default CardContent;
