import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchData } from "../store/slices/post";

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
		<div className=" bg-orange-300 flex-grow max-h-full">
			<div className="grid grid-cols-3 gap-4 ">
				{status === "succeeded" &&
					posts.map((ele, idx) => {
						return (
							<div
								key={idx}
								className="bg-purple-300 flex flex-col max-h-[340px]"
							>
								<img
									src={ele.url}
									className="w-full object-cover "
								></img>
								<div className="flex flex-col justify-between h-full">
									<div>{ele.title}</div>

									<div className="flex gap-6">
										<div>Like</div>
										<div>Comment</div>
										<div>Share</div>
										<div
											onClick={() => DelHandler(idx)}
											className="pointer"
										>
											Delete
										</div>
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
