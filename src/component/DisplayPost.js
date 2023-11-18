import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slices/post";

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
	}, [status]);
	return (
		<div className="h-full bg-orange-300 flex-grow">
			{status === "succeeded" &&
				posts.map((ele, idx) => {
					return (
						<div
							key={idx}
							className="bg-purple-300 grid grid-cols-3"
						>
							<img
								src={ele.url}
								className="w-full object-cover "
							></img>
							<div>{ele.title}</div>

							<div>
								<div>Like</div>
								<div>Comment</div>
								<div>Share</div>
								<div>Delete</div>
							</div>
						</div>
					);
				})}

			{status === "loading" && <div>Loading</div>}
			{status === "failed" && <div>Error in API call</div>}
		</div>
	);
};

export default DisplayPost;
