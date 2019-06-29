import { State } from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";

export class DeedOfValorState extends State {
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
