import { Box, toggle } from "./util.js";
import { Store } from "./Store.js";
import { NeutralState, AttackState } from "./TurnStates.js";

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
		this._underAttack = false;
		this._defensiveCards = [];
		this._defensivePower = 0;
	}

	get underAttack() {
		return this._underAttack;
	}

	attack(player) {
		if (this._underAttack) {
			if (player.turnPower > this._defensivePower) {
				if (this._controlledBy !== 0) {
					this._controlledBy._discardPile.splice(
						this._controlledBy._discardPile.length,
						0,
						this._defensiveCards
					);
				}
				console.log(`${this._controlledBy._discardPile} returned`);
				if (this._defensiveCards !== undefined) {
					this._defensiveCards.splice(0, this._defensiveCards.length);
				}
				for (let i = player.hand.length; i > 0; --i) {
					if (player.activeCards[i - 1]) {
						console.log(player.hand[i - 1]);
						this._defensiveCards.push(player.hand[i - 1]);
						console.log(this._defensiveCards);
						player.hand.splice(i - 1, 1);
						player.activeCards.splice(i - 1, 1);
					}
				}
				this._controlledBy = player;
				this._defensivePower = this._controlledBy.turnPower;
				console.log(this._controlledBy._discardPile);
			}
		} else {
			console.log("not enough power");
		}
		this._underAttack = false;
	}

	set underAttack(value) {
		this._underAttack = value;
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

	onClick(x, y, state, player) {
		if (this._box.contains(x, y)) {
			this._underAttack = toggle(this._underAttack);
			for (let i = 0; i < player.hand.length; ++i) {
				player.activeCards[i] = false;
			}
			state.turnState = new AttackState(state);
			console.log("Attack State");
		}
	}
	onAttackClick(x, y, state) {
		if (this._box.contains(x, y)) {
			this._underAttack = toggle(this._underAttack);
			state.turnState = new NeutralState(state);
			console.log("Neutral State");

			// if (this._storeBox.contains(x, y)) {
			// 	for (let store of this._stores) {
			// 		store.onClick(x, y, player);
			// 	}
			//}
		}
	}
	draw(ctx) {
		if (this._defensiveCards !== 0) {
			for (let i = 0; i < this._defensiveCards.length; ++i) {
				this._defensiveCards[i].draw(
					ctx,
					this._box.left - (this._defensiveCards.length - i) * 10,
					this._box.top - 25,
					this._controlledBy.color
				);
			}
		}
		if (this._controlledBy) {
			ctx.lineWidth = 10;
			ctx.strokeStyle = this._controlledBy.playerColor;
		} else {
			ctx.strokeStyle = "brown";
		}
		ctx.strokeRect(
			this._box.left,
			this._box.top,
			this._box.width,
			this._box.height
		);
		ctx.lineWidth = 1;
		ctx.fillStyle = "brown";
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = "12px";

		if (this._underAttack) {
			ctx.fillStyle = "red";
		}
		ctx.fillRect(
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
		ctx.fillText(`P:${this._defensivePower}`, 10, 30);
		ctx.restore();

		if (this._storesVisible) {
			for (let store of this._stores) {
				store.draw(ctx, "black");
			}
		}
	}
}
