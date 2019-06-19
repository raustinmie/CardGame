import { State } from "./Turnstates.js";
import { locations } from "./BoardState.js";
import { library } from "./CardLibrary.js";
import { Card } from "./Card.js";

export class AttackState extends State {
	onHover(x, y) {
		for (let location of locations) {
			location.onHover(x, y);
		}
	}

	onClick(x, y) {
		this.onPlayerClick(x, y);
		this._boardState.commitButton.onClick(x, y);

		for (let location of locations) {
			location.onAttackClick(x, y, this._boardState);
		}

		let fastingCards = 0;
		let angryMobCards = 0;
		let fireAndBrimstoneCards = 0;
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(i, "Fasting")) {
				++fastingCards;
			} else if (this.cardIsActive(i, "Angry Mob")) {
				++angryMobCards;
			} else if (this.cardIsActive(i, "Fire and Brimstone")) {
				++fireAndBrimstoneCards;
				console.log("Fire and Brimstone active");
			}
		}
		let numberOfMobBrimstonePairs = 0;
		if (angryMobCards < fireAndBrimstoneCards) {
			numberOfMobBrimstonePairs = angryMobCards;
		} else {
			numberOfMobBrimstonePairs = fireAndBrimstoneCards;
		}
		let angryMobPower = numberOfMobBrimstonePairs * 3 + angryMobCards;
		let fastingPower =
			angryMobPower * Math.pow(2, fastingCards) - angryMobCards;
		this.currentPlayer.calculateGold();
		this.calculatePower();
		this.currentPlayer.turnPower += fastingPower;
	}
	instructions1 = "Activate cards that will attack";
	instructions2 = null;
	instructions3 = null;

	commit() {
		for (let i = 0; i < this.hand.length; ++i) {
			if (this.cardIsActive(i, "Fire and Brimstone")) {
				for (let j = 0; j < this.hand.length; ++j) {
					if (this.cardIsActive(j, "Angry Mob")) {
						this.currentPlayer.removeCard(j);
					}
				}
			}
		}
		this.attackLocation();
		this._boardState.turnState = new NeutralState(this._boardState);
		this.currentPlayer.turnPower = 0;
		this.currentPlayer.turnPower = 0;
	}
}
