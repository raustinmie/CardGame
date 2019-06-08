import { BoardState } from "./BoardState.js";

document.addEventListener("DOMContentLoaded", function onLoad(event) {
	const boardCanvas = document.getElementById("board");
	const ctx = boardCanvas.getContext("2d");
	console.log("Document finished loading");

	// init
	const state = new BoardState();
	for (let i = 0; i < state._players.length; ++i) {
		state.nextTurn();
	}
	//	state.draw(ctx);
	boardCanvas.addEventListener("click", event => {
		let rect = boardCanvas.getBoundingClientRect();
		const xPos = event.clientX - rect.left;
		const yPos = event.clientY - rect.top;
		state.onClick(xPos, yPos);
	});
	boardCanvas.addEventListener("mousemove", event => {
		let rect = boardCanvas.getBoundingClientRect();
		const xPos = event.clientX - rect.left;
		const yPos = event.clientY - rect.top;
		state.onHover(xPos, yPos);
	});
	boardCanvas.addEventListener("keydown", event => {
		if (event == 27) {
			state.turnState = "neutral";
		}
	});
	// // start the game

	let lastTime = performance.now();

	const gameLoop = event => {
		const startTime = performance.now();

		// deltaTime is in ms
		const deltaTime = startTime - lastTime;

		// handle one frame of gameplay
		// state.play(deltaTime);

		// draw stuff
		ctx.clearRect(0, 0, board.width, board.height);
		state.draw(ctx);

		lastTime = startTime;
		if (state.running) {
			window.requestAnimationFrame(gameLoop);
		}
	};
	window.requestAnimationFrame(gameLoop);
});
