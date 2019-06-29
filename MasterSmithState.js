import { State } from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";

export class MasterSmithState extends State {
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		let horizontalOffset = 60;
		let verticalOffset = 110;
		let numberPerRow = 7;
		for (let i = 0; i < this.currentPlayer._discardPile.length; ++i) {
			let countY = Math.floor(i / numberPerRow);
			let countX = i % numberPerRow;
			let cardX = 200 + horizontalOffset * countX;
			let cardY = 100 + verticalOffset * countY;
			if (this.currentPlayer._discardPile[i].contains(x, y, cardX, cardY)) {
				this.hand.push(this.currentPlayer._discardPile[i]);
				this.currentPlayer.activeCards.push(false);
				this.currentPlayer._discardPile.splice(i, 1);
				for (let j = 0; j < this.hand.length; ++j) {
					if (this.cardIsActive(j, "Master Smith")) {
						this.currentPlayer.discard(j);
					}
				}
			}
		}
		this.deactivateState(null, NeutralState);
	}
	//TODO: Click to activate cards, make cancel button, commit click
}
