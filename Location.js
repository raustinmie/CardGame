import { Box, toggle } from "./util.js";
import { Store } from "./Store.js";
import { NeutralState } from "./NeutralState.js";
import { AttackState } from "./AttackState.js";
import { locations } from "./BoardState.js";

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
		this._activeCards = [];
	}

	get stores() {
		return this._stores;
	}

	get underAttack() {
		return this._underAttack;
	}

	get activeCards() {
		return this._activeCards;
	}

	get defensiveCards() {
		return this._defensiveCards;
	}

	set defensiveCards(value) {
		this._defensiveCards = value;
	}

	set activeCards(value) {
		this._activeCards = value;
	}

	cardOffset = 10;
	cardTopOffest = 25;
	activeOffset = 10;

	activateCard(x, y) {
		for (let j = 0; j < this._defensiveCards.length; ++j) {
			const cardX =
				this._box.left - this.cardOffset * (this._defensiveCards.length - j);
			const cardY = this._box.top - this.cardTopOffest;

			if (
				this._defensiveCards[j].contains(x, y, cardX, cardY) &&
				!this._box.contains(x, y) &&
				(j === this._defensiveCards.length - 1 ||
					!this._defensiveCards[j + 1].contains(
						x,
						y,
						cardX + this.cardOffset,
						cardY
					))
			) {
				for (let k = 0; k < locations.length; ++k) {
					for (let i = 0; i < this._defensiveCards.length; ++i) {
						if (this != locations[k] || i != j) {
							locations[k]._activeCards[i] = false;
						}
					}
				}
				this._activeCards[j] = toggle(this._activeCards[j]);
			}
		}
	}

	attack(player) {
		if (this._underAttack) {
			if (player.turnPower > this._defensivePower) {
				if (this._controlledBy !== 0) {
					this._controlledBy._discardPile = this._controlledBy._discardPile.concat(
						this._defensiveCards
					);
				}
				if (this._defensiveCards !== undefined) {
					this._defensiveCards.splice(0, this._defensiveCards.length);
				}
				for (let i = player.hand.length - 1; i > -1; --i) {
					if (player.activeCards[i]) {
						if (player._hand[i].afterAttack === "defend") {
							this._defensiveCards.push(player.hand[i]);
							this._activeCards.push(false);
							player.removeCard(i);
						} else if (player.hand[i].afterAttack === "discard") {
							player.discard(i);
						} else if (player.hand[i].afterAttack === "trash") {
							player.removeCard(i);
						}
					}
				}
				this._controlledBy = player;
				if (this._defensiveCards == []) {
					this._controlledBy = false;
				}
				this._defensivePower = 0;
				for (let i = 0; i < this._defensiveCards.length; ++i) {
					this._defensivePower += this._defensiveCards[i].power;
				}
			} else {
				console.log("not enough power");
				player.deactivateCards();
			}
			this._underAttack = false;
		}
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
		for (let i = 0; i < this._defensiveCards.length; ++i) {
			let cardX =
				this._box.left - (this._defensiveCards.length - i) * this.cardOffset;
			let cardY = this._box.top - this.cardTopOffest;
			if (this._defensiveCards[i].contains(x, y, cardX, cardY)) {
				this._defensiveCards[i].hovering = true;
			} else {
				this._defensiveCards[i].hovering = false;
			}
		}
	}

	deactivateCards(location) {
		for (let i = 0; i < location.defensiveCards.length; ++i) {
			location.defensiveCards[i] = false;
		}
	}

	onClick(x, y, state) {
		this.activateCard(x, y);
		if (this._box.contains(x, y)) {
			this._underAttack = toggle(this._underAttack);
			state.currentPlayer.deactivateCards();
			state.turnState = new AttackState(state);
		} else if (
			this._storesVisible &&
			this._storeBox.contains(x, y) &&
			state._currentPlayer == this._controlledBy
		) {
			for (let store of this._stores) {
				store.onClick(x, y, state);
			}
		}
	}
	onAttackClick(x, y, state) {
		if (this._box.contains(x, y)) {
			if (!this._underAttack) {
				for (let i = 0; i < locations.length; ++i) {
					locations[i]._underAttack = false;
				}
				this._underAttack = true;
			} else {
				this._underAttack = false;
				state.turnState = new NeutralState(state);
			}
			state._currentPlayer.deactivateCards();
		}
	}
	draw(ctx) {
		if (this._defensiveCards.length !== 0) {
			for (let i = 0; i < this._defensiveCards.length; ++i) {
				if (!this._activeCards[i]) {
					this._defensiveCards[i].draw(
						ctx,
						this._box.left -
							(this._defensiveCards.length - i) * this.cardOffset,
						this._box.top - this.cardTopOffest,
						"white"
					);
				} else {
					this._defensiveCards[i].draw(
						ctx,
						this._box.left -
							(this._defensiveCards.length - i) * this.cardOffset,
						this._box.top - this.cardTopOffest - this.activeOffset,
						"green"
					);
				}
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
