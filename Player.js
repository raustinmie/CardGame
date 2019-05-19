import { shuffle, Box, toggle } from "./util.js";
import { Card } from "./Card.js";
import { library } from "./CardLibrary.js";

export class Player {
	constructor(playerNumber, configData) {
		this._deck = [];
		this._discardPile = [];
		this._hand = [];
		this._playerNumber = playerNumber;
		this._playerColor = configData.color;
		this._box = new Box(configData.x, configData.y, configData.w, configData.h);
		this._turnState = 0;
		this._turnGold = 0;
		this._turnPower = 0;
		this._cardColor = configData.cardColor;
		this._activeCards = [];

		for (let j = 0; j < 5; ++j) {
			this.addToDeck(library.angryMob);
		}
		for (let j = 0; j < 5; ++j) {
			this.addToDeck(library.oldFarmer);
		}
	}

	get hand() {
		return this._hand;
	}

	get playerColor() {
		return this._playerColor;
	}

	get box() {
		return this._box;
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

	get activeCards() {
		return this._activeCards;
	}

	set activeCards(value) {
		this._activeCards = value;
	}

	calculateGold() {
		this._turnGold = 0;
		for (let i = 0; i < this._hand.length; ++i) {
			if (this._activeCards[i]) {
				this._turnGold += this._hand[i].gold;
			}
		}
	}

	calculatePower() {
		this._turnPower = 0;
		for (let i = 0; i < this._hand.length; ++i) {
			if (this._activeCards[i]) {
				this._turnPower += this._hand[i].power;
			}
		}
	}

	commitToBoardState() {
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.activeCards[i]) {
				console.log(`${this.hand[i].name}`);
				this.hand[i].playCard(this);
			}
		}
	}

	pickUpCard(value) {
		for (let i = 0; i < value; ++i) {
			if (this._deck.length == 0) {
				this._reshuffleDiscard();
			}
			this._hand.push(this._deck[0]);
			this._activeCards.push(false);
			this._deck.splice(0, 1);
		}
	}

	onClick(x, y) {
		for (let i = 0; i < this._hand.length; ++i) {
			const cardX = 290 + 40 * i;
			const cardY = 25;

			if (
				this._hand[i].contains(
					x,
					y,
					cardX,
					this._hand[i].width,
					cardY,
					this._hand[i].height
				)
			) {
				this._activeCards[i] = toggle(this._activeCards[i]);
			}
		}
	}

	discard(index) {
		console.log;
		this._discardPile.push(this._hand[index]);
		this._hand.splice(index, 1);
	}

	startTurn() {
		for (let i = this._hand.length; i < 5; ++i) {
			this.pickUpCard(1);
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
		// const { cost: cost, power: power, gold: gold, name: name } = card;
		this._discardPile.push(card);
	}
	addToDiscard(card) {
		this._discardPile.push(card);
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
			if (!this._activeCards[i]) {
				this._hand[i].draw(ctx, x + 90 + 40 * i, y + 25, this._cardColor);
			} else {
				this._hand[i].draw(ctx, x + 90 + 40 * i, y + 35, this._cardColor);
			}
		}
		ctx.fillText(`Gold:${this._turnGold}`, x + 350, y + 30);
		ctx.fillText(`Power:${this._turnPower}`, x + 350, y + 60);
	}
}
