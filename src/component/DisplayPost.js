import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchData } from "../store/slices/post";

import CardContent from "./CardContent";

const DisplayPost = () => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post.allPost);
	const status = useSelector((state) => state.post.status);
	const error = useSelector((state) => state.post.error);
	console.log(posts);

	useEffect(() => {
		if (status === "ideal") {
			//no data has been fetched yet
			dispatch(fetchData());
		}
	}, [status, dispatch, posts]);
	return (
		<div className=" bg-gradient-to-r from-[#c9c6c6] to-[#f1f2f6] flex-grow h-full min-h-screen pl-[280px] max-[550px]:pl-2 ">
			<div className="grid grid-cols-1 gap-4 p-4 pb-20 md:grid-cols-3 sm:grid-cols-2 ">
				{status === "succeeded" &&
					posts.map((ele, idx) => {
						return <CardContent ele={ele} key={idx} idx={idx} />;
					})}

				{status === "loading" && <div>Loading</div>}
				{status === "failed" && <div>Error in API call</div>}
			</div>
		</div>
	);
};

export default DisplayPost;
