import { stores, locations } from "./BoardState.js";
import { State } from "./TurnStates.js";

export class NeutralState extends State {
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
