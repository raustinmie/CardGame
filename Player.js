import { shuffle, Box, toggle } from "./util.js";
import { Card } from "./Card.js";
import { library } from "./CardLibrary.js";

const cardOffset = 40;
const handOffset = 90;
const discardPileOffset = 310;
const deckOffset = 25;
const activeOffset = 35;
const verticalOffset = 25;
const cardOrigin = 255;
const center = 400;

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

		//INITIALIZE: DEAL PLAYER CARDS
		// for (let j = 0; j < 1; ++j) {
		// 	this.addToDeck(new Card(library.foodCache));
		// }
		for (let j = 0; j < 1; ++j) {
			this.addToDeck(new Card(library.friar));
		}
		// for (let j = 0; j < 1; ++j) {
		// 	this.addToDeck(new Card(library.millersDaughter));
		// }
		for (let j = 0; j < 2; ++j) {
			this.addToDeck(new Card(library.fasting));
		}
		for (let j = 0; j < 2; ++j) {
			this.addToDeck(new Card(library.angryMob));
		}
	}

	get hand() {
		return this._hand;
	}

	get playerNumber() {
		return this.playerNumber;
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

	removeCard(index) {
		this.hand.splice(index, 1);
		this.activeCards.splice(index, 1);
	}

	deactivateCards(player) {
		for (let i = 0; i < player.hand.length; ++i) {
			player.activeCards[i] = false;
		}
	}

	pickUpCard(value) {
		for (let i = 0; i < value; ++i) {
			if (this._deck.length == 0 && this._discardPile.length !== 0) {
				this._reshuffleDiscard();
			} else if (this._deck.length == 0 && this._discardPile.length == 0) {
				break;
			}
			this._hand.push(this._deck[0]);
			this.hand[this._hand.length - 1].revealed = true;
			this._activeCards.push(false);
			this._deck.splice(0, 1);
		}
	}

	onClick(boardState, x, y) {
		for (let i = 0; i < this._hand.length; ++i) {
			const cardX = cardOrigin + cardOffset * i;
			const cardY = verticalOffset;

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
				boardState.activateCard(this._hand[i], this._activeCards[i]);
				// this._hand[i].activate(boardState);
			}
		}
	}

	discard(index) {
		this._discardPile.push(this._hand[index]);
		this._hand.splice(index, 1);
		this._activeCards.splice(index, 1);
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
		for (let i = 0; i < this._discardPile.length; ++i) {
			this._discardPile[i].revealed = false;
		}
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
		const x = this._box.left;
		const y = this._box.top;
		let w = this._box.width;
		let h = this._box.height;

		ctx.strokeStyle = "black";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = `12px`;
		ctx.fillStyle = this._playerColor;
		ctx.fillRect(x, y, w, h);

		ctx.save();
		{
			ctx.translate(x + w / 2, y + h / 2);
			ctx.rotate((Math.PI * this._playerNumber) / 2);
			if (this._playerNumber % 2 == 0) {
				w = this._box.width;
				h = this._box.height;
			} else {
				w = this._box.height;
				h = this._box.width;
			}
			ctx.translate(-x - w / 2, -y - h / 2);
			if (this._discardPile.length > 0) {
				this._discardPile[this._discardPile.length - 1].draw(
					ctx,
					x + discardPileOffset,
					y + verticalOffset,
					this._cardColor
				);
			}
			if (this._deck.length > 0) {
				this._deck[0].draw(
					ctx,
					x + deckOffset,
					y + verticalOffset,
					this._cardColor
				);
			}
			for (let i = 0; i < this._hand.length; ++i) {
				if (!this._activeCards[i]) {
					this._hand[i].draw(
						ctx,
						x + handOffset + cardOffset * i,
						y + verticalOffset,
						this._cardColor
					);
				} else {
					this._hand[i].draw(
						ctx,
						x + handOffset + cardOffset * i,
						y + activeOffset,
						this._cardColor
					);
				}
			}

			ctx.fillStyle = "black";
			ctx.fillText(`Gold:${this._turnGold}`, x + 420, y + 30);
			ctx.fillText(`Power:${this._turnPower}`, x + 420, y + 60);
		}
		// ctx.translate(x, y);
		ctx.restore();
	}
}
