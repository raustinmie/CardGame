//TODO: fix player rotation so that cards have correct coordinates
// _players[1] x = y, y=-x
// _players[2] x = -x, y=-y
// _players[3] x = -y, y = x

//Card Effects

function roll(min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max - min) + min);
}

const playerData = [
	{ color: "red", x: 200, y: 0, w: 400, h: 150, cardColor: "orange" },
	{ color: "blue", x: 650, y: 200, w: 150, h: 400, cardColor: "purple" },
	{ color: "yellow", x: 200, y: 650, w: 400, h: 150, cardColor: "white" },
	{ color: "green", x: 0, y: 200, w: 150, h: 400, cardColor: "brown" }
];

function onLoad(event) {
	const boardCanvas = document.getElementById("board");
	const ctx = boardCanvas.getContext("2d");
	console.log("Document finished loading");

	// init
	state = new BoardState();
	//	state.draw(ctx);

	document
		.getElementById("endTurnButton")
		.addEventListener("click", event => state.nextTurn());

	boardCanvas.addEventListener("click", event => {
		//console.log(`board clicked ${event.clientX}, ${event.clientY}`);
		let rect = boardCanvas.getBoundingClientRect();
		const xPos = event.clientX - rect.left;
		const yPos = event.clientY - rect.top;

		state.onClick(xPos, yPos);
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
}

function shuffle(array, cap) {
	if (cap === undefined) {
		cap = array.length;
	}

	for (let i = 0; i < array.length - 2 && i < cap; ++i) {
		const rand = roll(i, array.length);
		// swap
		const tmp = array[rand];
		array[rand] = array[i];
		array[i] = tmp;
	}

	return array;
}

class BoardState {
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

class Location {}

class Card {
	constructor(recruitmentCost, power, gold, cardName) {
		this._recruitmentCost = recruitmentCost;
		this._power = power;
		this._gold = gold;
		this._cardName = cardName;
	}
	contains(x, y, cardX, cardY) {
		return x >= cardX && x < cardX + 40 && y >= cardY && y < cardY + 100;
	}

	get cardName() {
		return this._cardName;
	}

	playCard(currentPlayer) {
		currentPlayer.turnGold = currentPlayer.turnGold + this._gold;
		currentPlayer.turnPower = currentPlayer.turnPower + this._power;
		console.log(`${this._cardName} played!`);
	}

	draw(ctx, x, y, color) {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = "12px";
		ctx.fillStyle = color;
		ctx.fillRect(x, y, 50, 100);
		ctx.strokeRect(x, y, 50, 100);
		//Card Name text
		ctx.fillStyle = "black";
		ctx.save();
		ctx.translate(x, y + 75);
		ctx.rotate((Math.PI * 3) / 2);
		ctx.fillText(`${this._cardName}`, 10, 10);
		// ctx.translate(-x, -y);
		ctx.restore();
	}
}

class Player {
	constructor(playerNumber, configData) {
		this._deck = [];
		this._discardPile = [];
		this._hand = [];
		this._playerNumber = playerNumber;
		this._playerColor = configData.color;
		this._x = configData.x;
		this._y = configData.y;
		this._w = configData.w;
		this._h = configData.h;
		this._turnState = 0;
		this._turnGold = 0;
		this._turnPower = 0;
		this._cardColor = configData.cardColor;

		for (let j = 0; j < 3; ++j) {
			this.addToDeck(AngryMob);
		}
		for (let j = 0; j < 7; ++j) {
			this.addToDeck(oldFarmer);
		}
	}

	get turnGold() {
		return this._turnGold;
	}

	set turnGold(value) {
		this._turnGold = value;
	}

	get turnPower() {
		return this._turnPower;
	}

	set turnPower(value) {
		this._turnPower = value;
	}

	pickUpCard() {
		if (this._deck.length == 0) {
			this._reshuffleDiscard();
		}
		this._hand.push(this._deck[0]);
		this._deck.splice(0, 1);
	}

	onClick(x, y) {
		for (let i = 0; i < this._hand.length; ++i) {
			const cardX = 290 + 40 * i;
			const cardY = 25;

			if (this._hand[i].contains(x, y, cardX, cardY)) {
				this._hand[i].playCard(this);
				this.discard(i);
				break;
			}
		}
	}

	discard(index) {
		this._discardPile.push(this._hand[index]);
		this._hand.splice(index, 1);
	}

	startTurn() {
		for (let i = this._hand.length; i < 5; ++i) {
			this.pickUpCard();
		}
	}

	readPlayerAction() {
		if (this._turnState == endTurn) return this._turnState;
	}

	_reshuffleDiscard() {
		shuffle(this._discardPile);
		this._deck = this._discardPile;
		this._discardPile = [];
	}

	addToDeck(card) {
		const { cost: cost, power: power, gold: gold, name: name } = card;
		this._discardPile.push(new Card(cost, power, gold, name));
	}

	//Player rendering

	draw(ctx) {
		const x = 200;
		const y = 0;
		const w = 400;
		const h = 150;

		ctx.strokeStyle = "black";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = `12px`;
		ctx.fillStyle = this._playerColor;
		ctx.fillRect(x, y, w, h);

		if (this._discardPile > 0) {
			this._discardPile[0].draw(ctx, x + 300, y + 25, this._cardColor);
		}
		if (this._deck.length > 0) {
			this._deck[0].draw(ctx, x + 25, y + 25, this._cardColor);
		}
		for (let i = 0; i < this._hand.length; ++i) {
			this._hand[i].draw(ctx, x + 90 + 40 * i, y + 25, this._cardColor);
		}
		ctx.fillText(`Gold:${this._turnGold}`, x + 350, y + 30);
		ctx.fillText(`Power:${this._turnPower}`, x + 350, y + 60);
	}

	// console() {
	// 	console.log(this._deck);
	// 	console.log(this._hand);
	// }
}

let AngryMob = { cost: 1, power: 1, gold: 0, name: "Angry Mob" };
let oldFarmer = { cost: 1, power: 0, gold: 1, name: "Old Farmer" };
