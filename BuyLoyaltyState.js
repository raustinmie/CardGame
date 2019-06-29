import { State } from "./TurnStates.js";
import { locations } from "./BoardState.js";
import { NeutralState } from "./NeutralState.js";

export class BuyLoyaltyState extends State {
	onClick(x, y) {
		this.onPlayerClick(x, y);
		this._boardState.commitButton.onClick(x, y);
		for (let location of locations) {
			location.onClick(x, y, this._boardState);
		}

		this.currentPlayer.calculateGold();
	}
	instructions1 = "Activate cards to get money to buy.";
	instructions2 = null;
	instructions3 = null;

	commit() {
		let loyaltyCost = 10;
		let location = locations.find(l => l.buying);
		if (
			this.currentPlayer.turnGold + location.defensivePower / 2 >=
			loyaltyCost
		) {
			location.loyalty.push(this.currentPlayer.playerNumber);
			console.log(location.loyalty);
		}
		this.deactivateState(null, NeutralState);
	}
}
