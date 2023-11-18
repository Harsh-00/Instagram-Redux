import React from "react";
import { useSelector } from "react-redux";

const DisplayPost = () => {
	const data = useSelector((state) => {
		return state.post;
	});
	console.log(data);
	return (
		<div className="h-full bg-orange-300">
			{data.map((ele, idx) => {
				return <div key={idx}>{ele.title}</div>;
			})}
		</div>
	);
};

export default DisplayPost;
