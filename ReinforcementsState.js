import { State } from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";
import { locations } from "./BoardState.js";

export class ReinforcementsState extends State {
	instructions1 = "";
	instructions2 = "";
	instructions3 = "";
	onClick(x, y) {
		this._boardState.commitButton.onClick(x, y);
		this.onPlayerClick(x, y);
		this.deactivateState("Reinforcements", NeutralState);
		for (let location of locations) {
			location.onClick(x, y, this._boardState, this._boardState._currentPlayer);
			// if (!location.box.contains(x, y)) {
			// 	location.underAttack = false;
			// }
		}
	}
	commit() {
		let reinforcingCards = 0;
		let reinforcementCards = 0;
		for (let i = 0; i < this.hand.length; ++i) {
			if (
				this.currentPlayer.activeCards[i] &&
				this.cardIsActive(i, "Reinforcements")
			) {
				++reinforcementCards;
			} else if (
				this.currentPlayer.activeCards[i] &&
				this.hand[i].power !== 0
			) {
				++reinforcingCards;
			}
		}
		console.log("reinforcing cards", reinforcingCards);
		if (reinforcingCards === 1 && reinforcementCards === 1) {
			let location = locations.find(l => l.underAttack);
			console.log(location.controlledBy);
			console.log(this.currentPlayer);
			if (location.controlledBy === this.currentPlayer) {
				for (let i = this.hand.length - 1; i > 0; --i) {
					if (this.cardIsActive(i, "Reinforcements")) {
						this.currentPlayer.discard(i);
					} else {
						if (this.currentPlayer.activeCards[i]) {
							location._defensivePower += this.hand[i].power;
							location.defensiveCards.push(this.hand[i]);
							this.currentPlayer.removeCard(i);
						}
					}
				}
			}
		}
		for (let i = 0; i < locations.length; ++i) {
			locations[i].underAttack = false;
		}
		this.deactivateState(null, NeutralState);
	}
}
