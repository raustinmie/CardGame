export class Card {
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
