import { Card } from "./Card.js";
import { Box, toggle } from "./util.js";
import { NeutralState } from "./NeutralState.js";
import { stores, locations } from "./BoardState.js";
import { BuyState } from "./BuyState.js";

const cardWidth = 50;
const cardHeight = 100;

export class Store {
	constructor(x, y, card) {
		this._x = x;
		this._y = y;
		this._name = card.name;
		this._cost = card.cost;
		this._card = card;
		this._box = new Box(x, y, cardWidth, cardHeight);
		this._buying = false;
	}

	get x() {
		return this._x;
	}

	get buying() {
		return this._buying;
	}

	get y() {
		return this._y;
	}

	//TODO make stores unclickable when invisible.

	onClick(x, y, state) {
		if (this._box.contains(x, y)) {
			state._currentPlayer.deactivateCards();
			this._buying = toggle(this._buying);
			state.turnState = new BuyState(state);
		}
	}
	buy(state) {
		if (state._currentPlayer.turnGold >= this._cost) {
			state._currentPlayer.addToDiscard(new Card(this._card));
			for (let i = state._currentPlayer.hand.length; i > 0; --i) {
				if (state._currentPlayer.activeCards[i - 1]) {
					state._currentPlayer._discardPile.push(
						state._currentPlayer.hand[i - 1]
					);
					state._currentPlayer.hand.splice(i - 1, 1);
					state._currentPlayer.activeCards.splice(i - 1, 1);
				}
				state._currentPlayer.turnGold = 0;
			}
		} else {
			alert("Not enough gold!");
			state._currentPlayer.deactivateCards();
			this._buying = toggle(this._buying);
		}
		this._buying = false;
		state.turnState = new NeutralState(state);
	}

	onBuyClick(x, y, state) {
		if (this._box.contains(x, y)) {
			if (!this._buying) {
				for (let i = 0; i < locations.length; ++i) {
					stores[i]._buying = false;
					for (let j = 0; j < 4; ++j) {
						locations[i]._stores[j]._buying = false;
					}
				}
				this._buying = true;
			} else {
				this._buying = false;
				state.turnState = new NeutralState(state);
			}
			state._currentPlayer.deactivateCards();
		}
	}
	draw(ctx) {
		ctx.strokeStyle = "black";
		ctx.textBaseline = "middle";
		ctx.textAlign = "left";
		ctx.font = "10px sans-serif";
		//this._box.(ctx)
		if (this._buying) {
			ctx.fillStyle = "green";
		} else {
			ctx.fillStyle = "black";
		}
		ctx.fillRect(
			this._box.left,
			this._box.top,
			this._box.width,
			this._box.height
		);
		ctx.strokeRect(
			this._box.left,
			this._box.top,
			this._box.width,
			this._box.height
		);
		//Card Name text
		ctx.fillStyle = "white";
		ctx.save();
		ctx.translate(this._x, this._y + 75);
		ctx.rotate((Math.PI * 3) / 2);
		ctx.fillText(this._name, 0, 10);
		ctx.fillText(this._cost, -10, 40);
		// ctx.translate(-x, -y);
		ctx.restore();
	}
}
