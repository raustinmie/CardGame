import { shuffle } from "./util.js";
import { Card } from "./Card.js";

let AngryMob = { cost: 1, power: 1, gold: 0, name: "Angry Mob" };
let oldFarmer = { cost: 1, power: 0, gold: 1, name: "Old Farmer" };

export class Player {
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
}
