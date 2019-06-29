import { locations } from "./BoardState.js";
import { Card } from "./Card.js";
import { library } from "./CardLibrary.js";

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

	onHover(x, y) {
		for (let location of locations) {
			location.onHover(x, y);
		}
		for (let player of this._boardState.players) {
			player.onHover(x, y);
		}
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
