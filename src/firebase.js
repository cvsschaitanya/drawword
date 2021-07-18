import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
	apiKey: "AIzaSyBYGaTl0HGtb1FsLFdQTIa2jbZy9VyIMBg",
	authDomain: "drawword-5e35d.firebaseapp.com",
	databaseURL: "https://drawword-5e35d-default-rtdb.firebaseio.com",
	projectId: "drawword-5e35d",
	storageBucket: "drawword-5e35d.appspot.com",
	messagingSenderId: "313913829438",
	appId: "1:313913829438:web:e3b376c56b9862016c496f",
	measurementId: "G-2V0N469TPC",
});

const signInWithGoogle = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth.signInWithPopup(provider);
};

const canvasRef = (canvasKey) => {
	return firebase.database().ref(`canvas/${canvasKey}`);
};

const newCanvasKey = () => {
	return firebase.database().ref("canvases").push().key;
};

export default {
	signInWithGoogle: signInWithGoogle,
	auth: firebase.auth,
	database: firebase.database,
	canvasRef: canvasRef,
	newCanvasKey: newCanvasKey,
};
