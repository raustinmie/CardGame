import { State } from "./TurnStates.js";

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
