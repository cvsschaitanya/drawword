import React, { Component } from "react";
import DrawingArea from "./DrawingArea";
import { useState, useRef } from "react";
import firebase from "../firebase";

const GameRoom = (props) => {
	const [canvasKey, setCanvasKey] = useState(
		props.canvasKey || firebase.newCanvasKey()
	);

	const changeCanvasKey = (newCanvasKey) => {
		if (newCanvasKey !== "") setCanvasKey(newCanvasKey);
	};

	return (
		<React.Fragment>
			<DrawingArea
				canvasKey={canvasKey}
				changeCanvasKey={changeCanvasKey}
				width={600}
				height={500}
			/>
		</React.Fragment>
	);
};

export default GameRoom;
