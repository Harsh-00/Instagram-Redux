import { useDispatch, useSelector } from "react-redux";
import AddPost from "./component/AddPost";
import DisplayPost from "./component/DisplayPost";
import Login from "./component/Login";
import { IoClose } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { commentPopup, sharePost, commentPost } from "./store/slices/post";

function App() {
	const share = useSelector((state) => state.post.share);
	const posts = useSelector((state) => state.post.allPost);
	const dispatch = useDispatch();
	const loginInfo = useSelector((state) => state.post.userInfo);
	const com = useSelector((state) => state.post.comment);
	const [comment, setTxt] = useState("");
	const [showComm, setShowComm] = useState(false);
	if (showComm === true) {
		var commIdx = com.index;
	}

	function CommentHandler() {
		if (showComm === true) {
			setShowComm(false);
			return;
		}
		console.log(loginInfo);
		if (loginInfo?.name == null) {
			alert("First Login then Comment");
			return;
		}
		const name = loginInfo.name;
		const commIdx = com.index;
		// idx must be same as time of clicking on btn

		console.log("HERE", { commIdx, comment, name });
		dispatch(commentPost({ commIdx, comment, name }));
		dispatch(commentPopup(false));
	}

	function ShowComHandler() {
		console.log(showComm);

		setShowComm(true);
	}
	return (
		<div>
			{share && (
				<div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md z-10 ">
					<div className="relative bg-blue-400 p-8 rounded-2xl">
						<IoClose
							className="absolute top-1 right-1 text-2xl cursor-pointer hover:text-red-800 hover:text-3xl transition-all duration-250 ease-in-out"
							onClick={() => {
								dispatch(sharePost(false));
							}}
						></IoClose>
						<p className="text-2xl border-b-2 border-black pb-1 font-semibold mb-8">
							Share It
						</p>
						<div className="flex gap-8 justify-center items-center ">
							<a
								href="https://www.linkedin.com/"
								className="bg-white rounded-full p-3.5 text-2xl cursor-pointer "
							>
								<FaLinkedin className="hover:text-blue-700 transition-all duration-300 ease-in-out hover:scale-125" />
							</a>
							<a
								href="https://www.instagram.com/"
								className="bg-white rounded-full p-3.5 text-2xl cursor-pointer "
							>
								<FaInstagram className="hover:text-pink-500 transition-all duration-300 ease-in-out hover:scale-125" />
							</a>
							<a
								href="https://twitter.com/"
								className="bg-white rounded-full p-3.5 text-2xl cursor-pointer "
							>
								<FaXTwitter className="transition-all duration-300 ease-in-out hover:scale-125 " />
							</a>
							<a
								href="https://www.facebook.com/"
								className="bg-white rounded-full p-3.5 text-2xl cursor-pointer  "
							>
								<FaFacebook className="hover:text-blue-500 transition-all duration-300 ease-in-out hover:scale-125 " />
							</a>
						</div>
					</div>
				</div>
			)}

			{com && (
				<div className="fixed z-10 top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md ">
					<div className="relative bg-blue-400 p-8 rounded-2xl">
						<IoClose
							className="absolute top-1 right-1 text-2xl cursor-pointer hover:text-red-800 hover:text-3xl transition-all duration-150 ease-in-out"
							onClick={() => {
								setShowComm(false);
								dispatch(commentPopup(false));
							}}
						></IoClose>
						<p className="text-2xl border-b-2 border-black pb-1 font-semibold mb-8">
							Comments
						</p>
						<div className="flex flex-col gap-8 justify-center items-center ">
							{!showComm && (
								<label>
									<textarea
										rows="5"
										cols="50"
										value={comment}
										placeholder="Write Here"
										onChange={(ev) =>
											setTxt(ev.target.value)
										}
									></textarea>
								</label>
							)}
							{showComm && (
								<div className="w-full">
									{posts[commIdx]?.comment?.map(
										(ele, idx) => (
											<div className="bg-white rounded-2xl px-4 py-2 mb-2 w-full ">
												<p className="text-lg font-semibold ">
													{ele.name}
												</p>
												<p className="text-gray-600">
													{ele.comment}
												</p>
											</div>
										)
									)}
								</div>
							)}
							<div className="flex gap-3 justify-center items-center">
								<div
									onClick={CommentHandler}
									className="cursor-pointer w-fit bg-purple-400 px-4 py-2 rounded-xl font-semibold place-self-end mr-8 hover:bg-purple-700 hover:text-white"
								>
									Add Comment
								</div>
								<div
									className="cursor-pointer w-fit bg-purple-400 px-4 py-2 rounded-xl font-semibold place-self-end mr-8 hover:bg-purple-700 hover:text-white"
									onClick={ShowComHandler}
								>
									Show Comments
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<Login />
			<div className="relative flex min-h-[100vh] items-stretch">
				<AddPost />
				<DisplayPost />
			</div>
		</div>
	);
}

export default App;
