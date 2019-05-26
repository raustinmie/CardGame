import { Card } from "./Card.js";
import { Box, toggle } from "./util.js";
import { NeutralState, BuyState } from "./TurnStates.js";
import { stores, locations } from "./BoardState.js";

const cardWidth = 50;
const cardHeight = 100;

export class Store {
	constructor(x, y, card) {
		this._x = x;
		this._y = y;
		this._cost = card.cost;
		this._name = card.name;
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

	onClick(x, y, player, state) {
		if (this._box.contains(x, y)) {
			player.deactivateCards;
			this._buying = toggle(this._buying);
			state.turnState = new BuyState(state);
			console.log("Buy State");
		}
	}
	buy(state) {
		if (state._currentPlayer.turnGold >= this._cost) {
			state._currentPlayer.addToDiscard(
				new Card(
					this._card.cost,
					this._card.name,
					this._card.gold,
					this._card.power,
					this._card.effect
				)
			);
			console.log(state._currentPlayer._discardPile);
			console.log(`${this._name} bought`);
			for (let i = state._currentPlayer.hand.length; i > 0; --i) {
				if (state._currentPlayer.activeCards[i - 1]) {
					state._currentPlayer._discardPile.push(
						state._currentPlayer.hand[i - 1]
					);
					state._currentPlayer.hand.splice(i - 1, 1);
					state._currentPlayer.activeCards.splice(i - 1, 1);
				}
				state._currentPlayer.turnGold = 0;
				console.log(state._currentPlayer._discardPile);
			}
		} else {
			alert("Not enough gold!");
			state._currentPlayer.deactivateCards(player);
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
				console.log("Neutral State");
			}
			state._currentPlayer.deactivateCards(state._currentPlayer);
		}
	}
	draw(ctx) {
		ctx.strokeStyle = "black";
		ctx.textBaseline = "middle";
		ctx.textAlign = "left";
		ctx.font = "12px";
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
