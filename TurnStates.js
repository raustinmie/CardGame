import { stores, locations } from "./BoardState.js";

function calibratePlayerClick(boardState, x, y) {
	if (boardState._currentPlayer.box.contains(x, y)) {
		switch (boardState._playerTurn) {
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
		boardState._players[boardState._playerTurn].onClick(x, y);
		console.log(x, y);
	}
}

class State {
	constructor(boardState) {
		this._boardState = boardState;
	}

	commit() {
		console.log("Unimplemented commit called");
	}
}

export class AttackState extends State {
	onClick(x, y) {
		calibratePlayerClick(this._boardState, x, y);
		this._boardState.commitButton.onClick(x, y);
		for (let location of locations) {
			location.onAttackClick(x, y, this._boardState);
		}
		this._boardState.currentPlayer.calculateGold();
		this._boardState.currentPlayer.calculatePower();
	}

	//location.commit(this._currentPlayer);
	commit() {
		console.log("AttackState commit called");
		this._boardState.currentPlayer.commitToBoardState();
		let location = locations.find(l => l.underAttack);
		location.attack(this._boardState.currentPlayer);
		this._boardState.turnState = new NeutralState(this._boardState);
		console.log("Neutral State");
		this._boardState.currentPlayer.turnPower = 0;
		this._boardState.currentPlayer.turnPower = 0;
	}
}

export class BuyState extends State {
	onClick(x, y) {
		calibratePlayerClick(this._boardState, x, y);
		this._boardState.commitButton.onClick(x, y);
		this._players[this._playerTurn].onClick(x, y);
		for (let i = 0; i < this._currentPlayer.hand.length; ++i) {
			if (this._currentPlayer.activeCards[i]) {
				this._currentPlayer.hand[i].playCard;
			}
		}
	}
	commit() {
		this._boardState.currentPlayer.commitToBoardState();
	}
}

export class NeutralState extends State {
	onClick(x, y) {
		calibratePlayerClick(this._boardState, x, y);

		for (let store of stores) {
			store.onClick(x, y, this._boardState._currentPlayer);
		}

		for (let location of locations) {
			location.onClick(x, y, this._boardState, this._boardState._currentPlayer);
		}
		this._boardState.endTurnButton.onClick(x, y);
	}
}
