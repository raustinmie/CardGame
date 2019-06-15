import { stores, locations, BoardState, playerData } from "./BoardState.js";
import { Card } from "./Card.js";
import { library } from "./CardLibrary.js";
import { toggle } from "./util.js";

class State {
	constructor(boardState) {
		this._boardState = boardState;
	}

	get stateName() {
		return this.constructor.name;
	}

	get currentPlayer() {
		return this._boardState.currentPlayer;
	}

	get hand() {
		return this.currentPlayer.hand;
	}

	cardIsActive(i, cardName) {
		if (this.hand[i].name === cardName && this.currentPlayer._activeCards[i]) {
			return true;
		}
	}

	attackLocation() {
		let location = locations.find(l => l.underAttack);
		location.attack(this.currentPlayer);
	}

	calculatePower() {
		this.currentPlayer._turnPower = 0;
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.currentPlayer._activeCards[i]) {
				this.currentPlayer._turnPower += this.hand[i].power;
			}
		}
	}

	deactivateState(cardName, EndState) {
		let stateCard = 0;
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(cardName)) {
				++stateCard;
			}
		}
		if (stateCard === 0) {
			this._boardState.turnState = new EndState(this._boardState);
			this.currentPlayer.deactivateCards(this.currentPlayer);
		}
		this.currentPlayer.turnPower = 0;
		this.currentPlayer.turnGold = 0;
	}

	onPlayerClick(x, y) {
		if (this.currentPlayer.box.contains(x, y)) {
			switch (this._boardState._playerTurn) {
				case 1:
					const i = x;
					x = y;
					y = 800 - i;
					break;
				case 2:
					x = 800 - x;
					y = 800 - y;
					break;
				case 3:
					const j = x;
					x = 800 - y;
					y = j;
				default:
					x = x;
					y = y;
			}
			this.currentPlayer.onClick(this._boardState, x, y);
		}
	}

	commit() {
		console.log("Unimplemented commit called");
	}
}

export class AttackState extends State {
	onHover(x, y) {
		for (let location of locations) {
			location.onHover(x, y);
		}
	}

	onClick(x, y) {
		this.onPlayerClick(x, y);
		this._boardState.commitButton.onClick(x, y);

		for (let location of locations) {
			location.onAttackClick(x, y, this._boardState);
		}
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.currentPlayer.activeCards[i]) {
				this.hand[i].activateAttack(this._boardState, this.hand[i].isActive);
			}
		}
		let fastingCards = 0;
		let angryMobCards = 0;
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(i, "Fasting")) {
				++fastingCards;
			} else if (this.cardIsActive(i, "Angry Mob")) {
				++angryMobCards;
			}
		}
		let fastingPower =
			angryMobCards * Math.pow(2, fastingCards) - angryMobCards;
		this.currentPlayer.calculateGold();
		this.calculatePower();
		this.currentPlayer.turnPower += fastingPower;
	}
	instructions1 = "Activate cards that will attack";
	instructions2 = null;
	instructions3 = null;

	commit() {
		for (let i = this.hand.length - 1; i > -1; --i) {
			if (
				this.cardIsActive(i, "Friar")
				// this.hand[i].name === "Friar" && this.currentPlayer.activeCards[i]
			) {
				this.currentPlayer.addToDiscard(new Card(library.angryMob));
			}
		}
		this.attackLocation();
		this._boardState.turnState = new NeutralState(this._boardState);
		this.currentPlayer.turnPower = 0;
		this.currentPlayer.turnPower = 0;
	}
}

export class BuyState extends State {
	onHover(x, y) {
		for (let location of locations) {
			location.onHover(x, y);
		}
	}
	onClick(x, y) {
		this.onPlayerClick(x, y);
		this._boardState.commitButton.onClick(x, y);
		for (let store of stores) {
			store.onBuyClick(x, y, this._boardState);
		}

		for (let location of locations) {
			if (location._controlledBy == this.currentPlayer) {
				for (let i = 0; i < location._stores.length; ++i) {
					location._stores[i].onBuyClick(x, y, this._boardState);
				}
			}
		}
		this.currentPlayer.calculateGold();
		this.calculatePower();
	}
	instructions1 = "Activate cards to get money to buy.";
	instructions2 = null;
	instructions3 = null;

	commit() {
		let store = stores.find(s => s.buying);
		for (let location of locations) {
			for (let i = 0; i < location._stores.length; ++i) {
				if (location._stores[i]._buying) {
					store = location._stores[i];
					break;
				}
			}
		}
		store.buy(this._boardState);
		this.currentPlayer.turnPower = 0;
		this.currentPlayer.turnPower = 0;
	}
}

export class NeutralState extends State {
	onHover(x, y) {
		for (let location of locations) {
			location.onHover(x, y);
		}
	}
	onClick(x, y) {
		this.onPlayerClick(x, y);

		for (let store of stores) {
			store.onClick(x, y, this._boardState);
		}

		for (let location of locations) {
			location.onClick(x, y, this._boardState, this._boardState._currentPlayer);
		}
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.currentPlayer.activeCards[i]) {
				this.hand[i].act;
			}
		}
		this._boardState.endTurnButton.onClick(x, y);
	}
	instructions1 = "Select a location to attack OR";
	instructions2 = "Select a store to buy from OR";
	instructions3 = "Select a card to play it";
	activateCard(card, isActive) {
		if (isActive) {
			card.activate(this._boardState);
		} else {
		}
	}
}
export class FoodCacheState extends State {
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		this.onPlayerClick(x, y);
		this.deactivateState("Food Cache", NeutralState);
	}
	instructions1 = "Choose a Starvation card to trash";
	instructions2 = null;
	instructions3 = null;
	commit() {
		for (let i = 0; i < this.hand.length; ++i) {
			if (
				this.hand[i].name == "Food Cache" &&
				this.currentPlayer.activeCards[i] == true
			) {
				for (let j = 0; j < this.hand.length; ++j) {
					if (
						this.hand[j].name == "Starvation" &&
						this.currentPlayer.activeCards[j]
					) {
						if (i > j) {
							//get rid of the higher index card first so the other index will not be altered.
							this.currentPlayer.discard(i);
							this.hand.splice(j, 1);
							this.currentPlayer.activeCards.splice(j, 1);
						} else {
							this.hand.splice(j, 1);
							this.currentPlayer.activeCards.splice(j, 1);
							this.currentPlayer.discard(i);
						}
					}
				}
			}
		}
		this.deactivateState(null, NeutralState);
	}
}

export class StarveEmOutState extends State {
	instructions1 = "Click Commit to give";
	instructions2 = "Every other player";
	instructions3 = "a Starvation card.";
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		this.onPlayerClick(x, y);
		this.deactivateState("Starve 'em Out!", NeutralState);
	}
	commit() {
		for (let i = 0; i < this.hand.length; ++i) {
			if (
				this.hand[i].name === "Starve 'em Out!" &&
				this.currentPlayer.activeCards[i]
			) {
				for (let j = 0; j < playerData.length; ++j) {
					if (this._boardState.players[j] !== this._currentPlayer) {
						this._boardState.players[j].addToDiscard(
							new Card(library.starvation)
						);
					}
				}
				this.currentPlayer.discard(i);
			}
		}
		this.deactivateState(null, NeutralState);
	}
}

export class MillersDaughterState extends State {
	instructions1 = "Click Commit to give";
	instructions2 = "Every other player";
	instructions3 = null;
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		this.onPlayerClick(x, y);
		this.deactivateState("Miller's Daughter", NeutralState);
		for (let location of locations) {
			location.onClick(x, y, this._boardState, this._boardState._currentPlayer);
		}
	}
	commit() {
		for (let i = 0; i < this.hand.length; ++i) {
			if (
				this.hand[i].name === "Miller's Daughter" &&
				this.currentPlayer.activeCards[i]
			) {
				for (let j = 0; j < locations.length - 1; ++j) {
					for (let k = 0; k < locations[j]._defensiveCards.length; ++k) {
						console.log(locations[j].activeCards[k]);
						if (locations[j]._activeCards[k]) {
							locations[j]._controlledBy._discardPile.push(
								locations[j]._defensiveCards[k]
							);
							console.log("discarding card");
							locations[j]._defensiveCards.splice(k, 1);
							locations[j].activeCards.splice(k, 1);
						}
					}
				}
				this.currentPlayer.discard(i);
			}
		}
		this.deactivateState(null, NeutralState);
	}
}
export class MasterSmithState extends State {
	constructor() {
		this._activeCards = [[]];
		this.initiateActiveCards();
	}
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
	}

	initiateActiveCards() {
		let j = 0;
		for (let i = 1; i < this.currentPlayer._discardPile.length; ++i) {
			this._activeCards[j].push(false);
			if (i % 7 == 0) {
				this._activeCards.push([]);
				++j;
			}
		}
	}

	draw(ctx) {
		if (this.currentPlayer._discardPile.length != 0) {
			let color = "white";
			for (
				let row = 0;
				row < this.currentPlayer._discardPile.length / 7;
				++row
			) {
				for (
					let column = 0;
					column < this.currentPlayer._discardPile.length && column < 7;
					++column
				) {
					if (this._activeCards[i][j] == true) {
						color = "green";
					}
					this.currentPlayer._discardPile[column].draw(
						ctx,
						150 + 60 * column,
						150 + 100 * row,
						color
					);
				}
			}
		}
	}
}
