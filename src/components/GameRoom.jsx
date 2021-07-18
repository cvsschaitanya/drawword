import React, { Component } from "react";
import DrawingArea from "./DrawingArea";
import { useState, useRef } from "react";

const GameRoom = (props) => {
	const DatabaseRef = props.DatabaseRef;

	return (
		<React.Fragment>
			<DrawingArea DatabaseRef={DatabaseRef} width={600} height={500} />
		</React.Fragment>
	);
};

export default GameRoom;
