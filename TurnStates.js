import { stores, locations, playerData } from "./BoardState.js";
import { Card } from "./Card.js";
import { library } from "./CardLibrary.js";
import { toggle } from "./util.js";

export class State {
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
	priestEffect(location) {
		for (let i = 0; i < location._defensiveCards.length; ++i) {
			if (location._defensiveCards[i].name === "Angry Mob") {
				location._defensiveCards.splice(i, 1);
				location._activeCards.splice(i, 1);
				this.hand.push(new Card(library.angryMob));
				this.currentPlayer.activeCards.push(true);
				this.calculatePower();
				break;
			}
		}
	}

	attackLocation() {
		let location = locations.find(l => l.underAttack);
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(i, "Priest")) {
				this.priestEffect(location);
			} else if (this.cardIsActive(i, "Friar")) {
				this.currentPlayer.addToDiscard(new Card(library.angryMob));
			}
		}
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
			if (this.cardIsActive(i, cardName)) {
				++stateCard;
			}
		}
		if (stateCard === 0) {
			this._boardState.turnState = new EndState(this._boardState);
			this.currentPlayer.deactivateCards();
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
			if (this.cardIsActive(i, "Food Cache")) {
				for (let j = 0; j < this.hand.length; ++j) {
					if (this.cardIsActive(j, "Starvation")) {
						if (i > j) {
							//get rid of the higher index card first so the other index will not be altered.
							this.currentPlayer.discard(i);
							this.currentPlayer.removeCard(j);
						} else {
							this.currentPlayer.removeCard(j);
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
	instructions1 = "Select a card and";
	instructions2 = "click commit to remove";
	instructions3 = "it from a location.";
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
							this.currentPlayer.discard(i);
						}
					}
				}
			}
		}
		this.deactivateState(null, NeutralState);
	}
}
export class MasterSmithState extends State {
	onHover() {}
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		let horizontalOffset = 60;
		let verticalOffset = 110;
		let numberPerRow = 7;
		for (let i = 0; i < this.currentPlayer._discardPile.length; ++i) {
			let countY = Math.floor(i / numberPerRow);
			let countX = i % numberPerRow;
			let cardX = 200 + horizontalOffset * countX;
			let cardY = 100 + verticalOffset * countY;
			if (this.currentPlayer._discardPile[i].contains(x, y, cardX, cardY)) {
				this.hand.push(this.currentPlayer._discardPile[i]);
				this.currentPlayer.activeCards.push(false);
				this.currentPlayer._discardPile.splice(i, 1);
				for (let j = 0; j < this.hand.length; ++j) {
					if (this.cardIsActive(j, "Master Smith")) {
						this.currentPlayer.discard(j);
					}
				}
			}
		}
		this.deactivateState(null, NeutralState);
	}
	//TODO: Click to activate cards, make cancel button, commit click
}
export class CallToArmsState extends State {
	instructions1 = "Click Commit to give";
	instructions2 = "Every other player";
	instructions3 = null;
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		this.onPlayerClick(x, y);
		this.deactivateState("Call To Arms", NeutralState);
	}
	commit() {
		this.currentPlayer.pickUpCard(3);
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(i, "Call To Arms")) {
				this.currentPlayer.discard(i);
			}
		}
		this.deactivateState(null, NeutralState);
	}
}
export class DeedOfValorState extends State {
	onHover() {}
	instructions1 = "Select an Angry Mob or";
	instructions2 = "Squire to upgrade it to";
	instructions3 = "a Squire or Knight";
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		this.onPlayerClick(x, y);
		this.deactivateState("Deed of Valor", NeutralState);
	}
	commit() {
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(i, "Deed of Valor")) {
				for (let j = 0; j < this.hand.length; ++j) {
					if (this.cardIsActive(j, "Angry Mob")) {
						if (i > j) {
							this.currentPlayer.discard(i);
							this.currentPlayer.removeCard(j);
							this.currentPlayer._discardPile.push(new Card(library.squire));
						} else {
							this.currentPlayer.removeCard(j);
							this.currentPlayer.discard(i);
							this.currentPlayer._discardPile.push(new Card(library.squire));
						}
					} else if (this.cardIsActive(j, "Squire")) {
						if (i > j) {
							this.currentPlayer.discard(i);
							this.currentPlayer.removeCard(j);
							this.currentPlayer._discardPile.push(new Card(library.knight));
						} else {
							this.currentPlayer.removeCard(j);
							this.currentPlayer.discard(i);
							this.currentPlayer._discardPile.push(new Card(library.knight));
						}
					}
				}
			}
		}
	}
}
