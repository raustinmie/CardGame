import { Card } from "./Card.js";
import { Box } from "./util.js";

export class Store {
	constructor(x, y, card) {
		this._x = x;
		this._y = y;
		this._cost = card.cost;
		this._name = card.name;
		this._card = card;
		this._box = new Box(x, y, 50, 100);
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	onClick(x, y, player) {
		if (this._box.contains(x, y)) {
			for (let i = 0; i < player.hand.length; ++i) {
				player.activeCards[i] = false;
			}
			state.turnState = new BuyState(state);
			console.log("Buy State");
			// if (currentPlayer.turnGold >= this._cost) {
			// 	currentPlayer.addToDiscard(this._card);
			// 	currentPlayer.turnGold -= this._cost;
			// } else {
			// 	alert("Not enough gold!");
			//}
		}
	}

	draw(ctx, color) {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.textBaseline = "middle";
		ctx.textAlign = "left";
		ctx.font = "12px";
		ctx.fillStyle = color;
		//this._box.(ctx)
		ctx.fillRect(
			this._box.left,
			this._box.top,
			this._box.width,
			this._box.height
		);
		ctx.strokeRect(this._x, this._y, 50, 100);
		//Card Name text
		ctx.fillStyle = "white";
		ctx.save();
		ctx.translate(this._x, this._y + 75);
		ctx.rotate((Math.PI * 3) / 2);
		ctx.fillText(`${this._name}`, 0, 10);
		ctx.fillText(`${this._cost}`, -10, 40);
		// ctx.translate(-x, -y);
		ctx.restore();
	}
}
