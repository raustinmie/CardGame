import { State } from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";

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
