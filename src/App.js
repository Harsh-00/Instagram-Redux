import AddPost from "./component/AddPost";
import DisplayPost from "./component/DisplayPost";
import Login from "./component/Login";

function App() {
	return (
		<div className="flex min-h-[100vh] ">
			<AddPost />
			<DisplayPost />
			<Login />
		</div>
	);
}

export default App;
