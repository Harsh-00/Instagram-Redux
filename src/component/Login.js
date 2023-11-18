import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../store/slices/post";

const Login = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.post);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	function EmailHandler(ev) {
		setEmail(ev.target.value);
	}

	function NameHandler(ev) {
		setName(ev.target.value);
	}

	function LoginHandler() {
		if (!name) return;
		dispatch(loggedIn({ email, name }));
	}
	return (
		<div className="bg-red-300 h-full min-h-screen min-w-[220px]">
			{login && <div>Welcome, {}</div>}
			Login
			<label>
				Name:
				<input
					type="text"
					onChange={NameHandler}
					value={name}
					required
				></input>
			</label>
			<label>
				Email:
				<input
					type="email"
					onChange={EmailHandler}
					value={email}
				></input>
			</label>
			<div onClick={LoginHandler}>Login/Signup</div>
		</div>
	);
};

export default Login;
