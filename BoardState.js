import { Player } from "./Player.js";

const playerData = [
	{ color: "red", x: 200, y: 0, w: 400, h: 150, cardColor: "orange" },
	{ color: "blue", x: 650, y: 200, w: 150, h: 400, cardColor: "purple" },
	{ color: "yellow", x: 200, y: 650, w: 400, h: 150, cardColor: "white" },
	{ color: "green", x: 0, y: 200, w: 150, h: 400, cardColor: "brown" }
];

export class BoardState {
	constructor() {
		this._playerTurn = 0;
		this._running = true;
		this._players = [];
		// players?
		// locations
		// current player
		for (let i = 0; i < playerData.length; ++i) {
			this._players.push(new Player(i, playerData[i]));
		}

		this._currentPlayer = this._players[this._playerTurn];
		this._currentPlayer.startTurn();
	}

	get running() {
		return this._running;
	}

	onClick(x, y) {
		// TODO: translate x,y to player coords
		// ---- x and y are variables that are passed in, the variable passed in is xPos and yPos, which is correct

		switch (this._playerTurn) {
			case 1:
				const i = x;
				x = y;
				y = 800 - i;
				break;
			case 2:
				x = 800 - x;
				y = 800 - y;
				break;
			case 3:
				const j = x;
				x = 800 - y;
				y = j;
		}

		// _players[1] x = y, y=-x
		// _players[2] x = -x, y=-y
		// _players[3] x = -y, y = x

		this._players[this._playerTurn].onClick(x, y);
	}

	get currentPlayer() {
		return this._currentPlayer;
	}

	draw(ctx) {
		ctx.strokeStyle = "black";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = `12px`;

		for (let i = 0; i < this._players.length; ++i) {
			ctx.translate(400, 400);
			ctx.rotate((Math.PI / 2) * i);
			ctx.translate(-400, -400);
			this._players[i].draw(ctx);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	}

	nextTurn() {
		this._playerTurn = (this._playerTurn + 1) % 4;
		this._currentPlayer = this._players[this._playerTurn];
		this._currentPlayer.startTurn();
		console.log(this._currentPlayer);
		console.log(this._playerTurn);
	}
}
