import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchData } from "../store/slices/post";
import { GrLike } from "react-icons/gr";
import { FaComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const DisplayPost = () => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post.allPost);
	const status = useSelector((state) => state.post.status);
	const error = useSelector((state) => state.post.error);
	console.log(posts);

	function DelHandler(idx) {
		console.log(idx);
		dispatch(deletePost(idx));
	}

	useEffect(() => {
		if (status === "ideal") {
			//no data has been fetched yet
			dispatch(fetchData());
		}
	}, [status, dispatch, posts]);
	return (
		<div className=" bg-orange-300 flex-grow h-full">
			<div className="grid grid-cols-3 gap-4 p-6">
				{status === "succeeded" &&
					posts.map((ele, idx) => {
						return (
							<div
								key={idx}
								className="bg-purple-300 flex flex-col max-h-[400px] pb-3 rounded-xl"
							>
								<img
									src={ele.url}
									className="w-full object-center object-contain max-h-[270px] rounded-xl"
								></img>
								<div className="flex flex-col justify-between h-full pl-1 text-lg">
									<div>{ele.title}</div>

									<div className="flex gap-12 mt-4 justify-evenly">
										<GrLike className="cursor-pointer"></GrLike>
										<FaComment className="cursor-pointer"></FaComment>
										<FaShare className="cursor-pointer"></FaShare>
										<MdOutlineDelete
											onClick={() => DelHandler(idx)}
											className="cursor-pointer"
										>
											Delete
										</MdOutlineDelete>
									</div>
								</div>
							</div>
						);
					})}

				{status === "loading" && <div>Loading</div>}
				{status === "failed" && <div>Error in API call</div>}
			</div>
		</div>
	);
};

export default DisplayPost;
