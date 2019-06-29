import { State } from "./TurnStates.js";
import { locations } from "./BoardState.js";
import { NeutralState } from "./NeutralState.js";

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
			if (this.cardIsActive(i, "Miller's Daughter")) {
				for (let j = 0; j < locations.length - 1; ++j) {
					for (let k = 0; k < locations[j]._defensiveCards.length; ++k) {
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
