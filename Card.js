export class Card {
	constructor(cost, name, gold, power, effect) {
		this._cost = cost;
		this._name = name;
		this._width = 50;
		this._height = 100;
		this._gold = gold;
		this._power = power;
		this._effect = effect;
		this._revealed = false;
	}
	contains(x, y, cardX, cardY) {
		return x >= cardX && x < cardX + 40 && y >= cardY && y < cardY + 100;
	}

	get revealed() {
		return this._revealed;
	}

	set revealed(value) {
		this._revealed = value;
	}

	get gold() {
		return this._gold;
	}

	get power() {
		return this._power;
	}

	get name() {
		return this._name;
	}

	get cost() {
		return this._cost;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	playCard(currentPlayer) {
		if (this._effect) {
			this._effect(currentPlayer);
		} else if (this._effect === undefined) {
			console.error("Missing effect");
		}
	}

	draw(ctx, x, y, color) {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = "12px";
		ctx.fillStyle = color;
		ctx.fillRect(x, y, this._width, this._height);
		ctx.strokeRect(x, y, this._width, this._height);
		//Card Name text
		ctx.fillStyle = "black";
		if (this._revealed) {
			ctx.save();
			ctx.translate(x, y + 75);
			ctx.rotate((Math.PI * 3) / 2);
			ctx.fillText(`${this._name}`, 10, 10);
			// ctx.translate(-x, -y);
			ctx.restore();
			ctx.fillText(`C:${this._cost}`, this._x + 10, this._y + 10);
		}
	}
}
