import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../store/slices/post";

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
		<div className="bg-red-300 h-full min-w-[220px] pl-4 py-2 text-xl  tracking-wide">
			{login && (
				<div className="text-xl font-semibold tracking-wide">
					Welcome, {loginInfo.name}
				</div>
			)}
			{!login && <div onClick={PopupHandler}>Login/Signup</div>}
			{popup && (
				<div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-brightness-50 backdrop-blur-md ">
					<div className="relative flex flex-col gap-4 justify-center items-center bg-blue-400 p-8 rounded-2xl">
						<div
							onClick={() => setPopup(false)}
							className="absolute top-0 right-0"
						>
							Close
						</div>
						<p className="text-xl font-bold mb-4">Login</p>
						<label>
							Name:
							<input
								type="text"
								onChange={NameHandler}
								value={name}
								required
								className="ml-3"
							></input>
						</label>
						<label>
							Email:
							<input
								type="email"
								onChange={EmailHandler}
								value={email}
								className="ml-3"
							></input>
						</label>
						<div onClick={LoginHandler}>Login/Signup</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
