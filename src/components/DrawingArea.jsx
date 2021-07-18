import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { FormControl, Button } from "react-bootstrap";

import { Stage, Layer, Line } from "react-konva";
import { useState, useRef, useEffect } from "react";
import firebase from "../firebase";

const DrawingArea = (props) => {
	const [lines, setLines] = useState([]);
	console.log(lines);

	useEffect(() => {
		firebase.canvasRef(props.canvasKey).on("value", (snapshot) => {
			// console.log(snapshot);
			setLines(snapshot.val() || []);
		});
	}, [props.canvasKey]);

	const writeLines = (newLines) => {
		// props.writeLines(newLines);
		firebase.canvasRef(props.canvasKey).set(newLines);
		setLines(newLines);
	};

	const isDrawing = useRef(false);

	const handleMouseUp = () => {
		// console.log("Mouse Up");
		isDrawing.current = false;
	};

	const handleMouseDown = (e) => {
		isDrawing.current = true;
		const pos = e.target.getStage().getPointerPosition();
		writeLines([...lines, { points: [pos.x, pos.y] }]);
		// console.log(lines);
	};

	const handleMouseMove = (e) => {
		// no drawing - skipping
		if (!isDrawing.current) {
			return;
		}
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();

		// To draw line
		let lastLine = lines[lines.length - 1];

		if (lastLine) {
			// add point
			lastLine.points = lastLine.points.concat([point.x, point.y]);

			// replace last
			lines.splice(lines.length - 1, 1, lastLine);
			writeLines(lines.concat());
		}
	};

	const handleMouseLeave = (e) => {
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseEnter = (e) => {
		if (isDrawing.current) handleMouseDown(e);
	};

	const toolbarStyle = {
		height: 50,
		width: "100%",
		backgroundColor: "rgb(10, 10, 43)",
		display: "flex",
		flex: 1,
	};

	const areaStyle = {
		width: props.width,
		height: props.height + 50,
		border: "1px solid black",
		margin: "auto",
	};

	useEffect(() => {
		document.getElementById("canvas-key-box").value = props.canvasKey;
	});

	return (
		<div style={areaStyle}>
			<div style={toolbarStyle}>
				<Button
					className="m-2"
					size="sm"
					variant="primary"
					onClick={() => {
						props.changeCanvasKey(firebase.newCanvasKey());
					}}
				>
					New
				</Button>
				<input
					id="canvas-key-box"
					className="form-control m-2"
					placeholder="Canvas Key"
				/>
				<Button
					className="m-2"
					size="sm"
					variant="success"
					onClick={() => {
						props.changeCanvasKey(
							document.getElementById("canvas-key-box").value
						);
					}}
				>
					Load
				</Button>
				<Button
					className="m-2"
					size="sm"
					variant="warning"
					onClick={() => {
						writeLines([]);
					}}
				>
					Clear
				</Button>
			</div>
			<Stage
				width={props.width}
				height={props.height}
				onMouseDown={handleMouseDown}
				onMousemove={handleMouseMove}
				onMouseup={handleMouseUp}
				// onMouseLeave={handleMouseLeave}
				// onMouseEnter={handleMouseEnter}
				className="canvas-stage"
			>
				<Layer>
					{lines.map((line, i) => (
						<Line
							key={i}
							points={line.points}
							stroke={line.stroke || "blue"}
							strokeWidth={line.strokeWidth || 5}
							// tension={0}
							bezier={true}
							lineCap="round"
							// globalCompositeOperation={
							// 	line.tool === "eraser"
							// 		? "destination-out"
							// 		: "source-over"
							// }
						/>
					))}
				</Layer>
			</Stage>
		</div>
	);
};

export default DrawingArea;
