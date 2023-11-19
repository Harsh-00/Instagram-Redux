import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../store/slices/post";
import { IoClose } from "react-icons/io5";

const Login = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.post.user);
	console.log(login);
	const loginInfo = useSelector((state) => state.post.userInfo);
	console.log(loginInfo);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	//for pop up dialog box
	const [popup, setPopup] = useState(false);

	function EmailHandler(ev) {
		setEmail(ev.target.value);
	}

	function NameHandler(ev) {
		setName(ev.target.value);
	}

	function LoginHandler() {
		if (!name) return;
		console.log(name);
		setPopup(false);
		dispatch(loggedIn({ email, name }));
	}

	function PopupHandler() {
		setPopup(true);
	}
	return (
		<div className="bg-red-300 h-full min-w-[220px] pl-4 py-2 flex justify-end  ">
			{login && (
				<div className="text-xl font-semibold tracking-wide pr-6">
					Welcome, {loginInfo.name}
				</div>
			)}
			{!login && (
				<div
					onClick={PopupHandler}
					className="cursor-pointer w-fit bg-purple-400 px-4 py-2 rounded-xl font-semibold place-self-end mr-8"
				>
					Login/Signup
				</div>
			)}
			{popup && (
				<div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md over z-10">
					<div className="relative flex flex-col gap-4 justify-center items-center bg-blue-400 p-8 rounded-2xl min-w-[400px]">
						<IoClose
							onClick={() => setPopup(false)}
							className="absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-800"
						></IoClose>
						<p className="text-2xl font-bold mb-4">Login</p>
						<label>
							Name:
							<input
								type="text"
								onChange={NameHandler}
								value={name}
								required
								className="ml-3 px-2"
							></input>
						</label>
						<label>
							Email:
							<input
								type="email"
								onChange={EmailHandler}
								value={email}
								className="ml-3 px-2"
							></input>
						</label>
						<div
							onClick={LoginHandler}
							className="bg-gray-700 px-3 py-1 mt-4 rounded-lg font-semibold text-white  tracking-wider hover:opacity-[0.90] cursor-pointer"
						>
							Login/Signup
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
