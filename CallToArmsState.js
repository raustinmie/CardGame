import { State } from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";

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
