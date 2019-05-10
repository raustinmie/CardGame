export class Card {
	constructor(cost, name, effect) {
		this._cost = cost;
		this._name = name;
		this.playCard = effect;
		this._width = 50;
		this._height = 100;
	}
	contains(x, y, cardX, cardY) {
		return x >= cardX && x < cardX + 40 && y >= cardY && y < cardY + 100;
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
		this._effect(currentPlayer);
		// currentPlayer.turnGold = currentPlayer.turnGold + this._gold;
		// currentPlayer.turnPower = currentPlayer.turnPower + this._power;
		// console.log(`${this._name} played!`);
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
		ctx.save();
		ctx.translate(x, y + 75);
		ctx.rotate((Math.PI * 3) / 2);
		ctx.fillText(`${this._name}`, 10, 10);
		ctx.fillText(`${this._cost}`, 0, 40);
		// ctx.translate(-x, -y);
		ctx.restore();
	}
}
