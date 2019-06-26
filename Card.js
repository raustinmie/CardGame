export class Card {
	constructor(card) {
		this._cost = card.cost;
		this._name = card.name;
		this._name2 = card.name2;
		this._width = 50;
		this._height = 100;
		this._gold = card.gold;
		this._power = card.power;
		this._onActivate = card.effect;
		this._revealed = true;
		this._afterAttack = card.afterAttack;
		this._hovering = false;
		this._cardText = card.cardText;
		this._cardText2 = card.cardText2;
		this._cardText3 = card.cardText3;
		this._cardText4 = card.cardText4;
	}
	contains(x, y, cardX, cardY) {
		return x >= cardX && x < cardX + 40 && y >= cardY && y < cardY + 100;
	}

	get hovering() {
		return this._hovering;
	}

	set hovering(value) {
		this._hovering = value;
	}

	get revealed() {
		return this._revealed;
	}

	get afterAttack() {
		return this._afterAttack;
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

	activate(boardState, isActive) {
		if (this._onActivate) {
			this._onActivate(boardState, isActive);
		} else if (this._onActivate === undefined) {
			console.error("Missing effect");
		}
	}

	draw(ctx, x, y, color) {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "white";
		ctx.textBaseline = "middle";
		ctx.textAlign = "left";
		ctx.font = "6px Arial";
		ctx.fillStyle = color;
		let scale = 1;
		if (this.hovering) {
			scale = 2;
		}
		// if (!this.hovering) {
		// 	ctx.fillRect(x, y, this._width, this._height);
		// 	ctx.strokeRect(x, y, this._width, this._height);
		// 	//Card Name text
		// 	ctx.fillStyle = "black";
		// 	if (this._revealed) {
		// 		ctx.fillText(this._name, x + 5, y + 10);
		// 		if (this._name2 !== null) {
		// 			ctx.fillText(this._name2, x + 5, y + 16);
		// 		}
		// ctx.save();
		// ctx.translate(x, y + 95);
		// ctx.rotate((Math.PI * 3) / 2);
		// ctx.fillText(`${this._name}`, 10, 10);
		// // ctx.translate(-x, -y);
		// ctx.restore();
		// ctx.fillText(`C:${this._cost}`, this._x + 10, this._y + 10);
		// }
		// } else if (this.hovering && this._revealed) {
		ctx.textBaseline = "middle";
		ctx.textAlign = "left";
		ctx.font = `${6 * scale}px Arial`;
		ctx.fillRect(x, y, this._width * scale, this._height * scale);
		ctx.strokeRect(x, y, this._width * scale, this._height * scale);
		ctx.fillStyle = "black";
		let picX = 5;
		let picY = 20;
		let picW = 40;
		let picH = 40;
		let nameX = 5;
		let nameY = 10;
		let nameY2 = 16;
		let pX = 8;
		let gX = 20;
		let cX = 32;
		let statsY = 92;
		let textX = 5;
		let text1Y = 65;
		let text2Y = 70;
		let text3Y = 75;
		let text4Y = 80;
		if (this.revealed) {
			ctx.fillRect(
				x + picX * scale,
				y + picY * scale,
				picW * scale,
				picH * scale
			);
			ctx.fillText(this._name, x + nameX * scale, y + nameY * scale);
			if (this._name2 !== null) {
				ctx.fillText(this._name2, x + nameX * scale, y + nameY2 * scale);
			}
			if (this.power != -0 || this.gold !== 0) {
				ctx.fillText(`P:${this.power}`, x + pX * scale, y + statsY * scale);
				ctx.fillText(`G:${this.gold}`, x + gX * scale, y + statsY * scale);
			}
			ctx.fillText(`C:${this.cost}`, x + cX * scale, y + statsY * scale);
			ctx.font = `${5 * scale}px Arial`;
			ctx.fillText(this._cardText, x + textX * scale, y + text1Y * scale);
			ctx.fillText(this._cardText2, x + textX * scale, y + text2Y * scale);
			ctx.fillText(this._cardText3, x + textX * scale, y + text3Y * scale);
			ctx.fillText(this._cardText4, x + textX * scale, y + text4Y * scale);
		}
	}
}
