import { Box, toggle } from "./util.js";
import { Store } from "./Store.js";

export class Location {
	constructor(x, y, name, store1, store2, store3, store4) {
		this._x = x;
		this._y = y;
		this._name = name;
		this._stores = [
			new Store(x, y - 110, store1),
			new Store(x - 60, y - 25, store2),
			new Store(x + 60, y - 25, store3),
			new Store(x, y + 60, store4)
		];
		this._controlledBy = 0;
		this._box = new Box(x, y, 50, 50);
		this._storeBox = new Box(x - 60, y - 110, 170, 320);
		this._storesVisible = false;
		this._cardsPresent = [];
		this._power = 0;
	}
	canUse(player) {
		if (this._controlledBy == player) return true;
	}

	onHover(x, y) {
		if (this._box.contains(x, y)) {
			this._storesVisible = true;
		}
		if (!this._storeBox.contains(x, y)) {
			this._storesVisible = false;
		}
	}

	onClick(x, y, player) {
		if (this._box.contains(x, y)) {
			// do whatever validation you need to do to verify player can own location
			console.log(`${this._name} clicked`);
			this._controlledBy = player;
		}
		if (this._storeBox.contains(x, y)) {
			for (let store of this._stores) {
				store.onClick(x, y, player);
			}
		}
	}

	draw(ctx) {
		ctx.strokeStyle = "black";
		ctx.fillStyle = "brown";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = "12px";
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
		//Location Name text
		ctx.fillStyle = "white";
		ctx.save();
		ctx.translate(this._x + 15, this._y);
		ctx.fillText(`${this._name}`, 10, 10);
		ctx.restore();

		if (this._storesVisible) {
			for (let store of this._stores) {
				store.draw(ctx, "black");
			}
		}
	}
}
