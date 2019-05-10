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

	onClick(x, y, currentPlayer) {
		if (this._box.contains(x, y)) {
			console.log(`${this._name} clicked`);
			currentPlayer.addToDiscard(this._card);
		}
	}

	draw(ctx, color) {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
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
		ctx.fillText(`${this._name}`, 10, 10);
		ctx.fillText(`${this._cost}`, 0, 40);
		// ctx.translate(-x, -y);
		ctx.restore();
	}
}
