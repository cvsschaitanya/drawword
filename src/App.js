import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

import firebase from "./firebase";

import NavBar from "./components/NavBar";
import GameRoom from "./components/GameRoom";

import { useAuthState } from "react-firebase-hooks/auth";

// firebase.initializeApp({
// 	apiKey: "AIzaSyBYGaTl0HGtb1FsLFdQTIa2jbZy9VyIMBg",
// 	authDomain: "drawword-5e35d.firebaseapp.com",
// 	databaseURL: "https://drawword-5e35d-default-rtdb.firebaseio.com",
// 	projectId: "drawword-5e35d",
// 	storageBucket: "drawword-5e35d.appspot.com",
// 	messagingSenderId: "313913829438",
// 	appId: "1:313913829438:web:e3b376c56b9862016c496f",
// 	measurementId: "G-2V0N469TPC",
// });

const auth = firebase.auth();
const database = firebase.database();

function App(props) {
	const [user] = useAuthState(auth);

	// const urlSegments = window.location.href.split("/");
	// console.log(urlSegments);
	// if (urlSegments[4] === "canvas") {
	// 	canvasKey = urlSegments[5];
	// }

	return (
		<div className="App">
			<NavBar AccountButton={user ? SignOut : SignIn}></NavBar>

			<section>
				<GameRoom Database={database} />
			</section>
		</div>
	);
}

export default App;

function SignIn() {
	// const signInWithGoogle = () => {
	// 	const provider = new firebase.auth.GoogleAuthProvider();
	// 	auth.signInWithPopup(provider);
	// };

	return (
		<Button variant="primary" onClick={firebase.signInWithGoogle}>
			Sign In with Google
		</Button>
	);
}

function SignOut() {
	return (
		auth.currentUser && (
			<Button
				onClick={() => {
					auth.signOut();
				}}
				variant="primary"
			>
				Sign Out
			</Button>
		)
	);
}
