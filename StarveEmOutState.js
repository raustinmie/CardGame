import { State } from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";

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
