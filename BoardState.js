import { Player } from "./Player.js";
import { library } from "./CardLibrary.js";
import { Store } from "./Store.js";
import { Card } from "./Card.js";
import { Location } from "./Location.js";
import { Button } from "./util.js";
import {
	AttackState,
	BuyState,
	NeutralState,
	MasterSmithState
} from "./TurnStates.js";

export const locations = [
	new Location(
		375,
		250,
		"Farm",
		library.foodCache,
		library.youngFarmhand,
		library.millersDaughter,
		library.starveEmOut
	),
	new Location(
		500,
		375,
		"Workshop",
		library.boilingOil,
		library.apprentice,
		library.masterSmith,
		library.siegeEngine
	),
	new Location(
		250,
		375,
		"Abbey",
		library.friar,
		library.fasting,
		library.priest,
		library.fireAndBrimstone
	),
	new Location(
		375,
		500,
		"Castle",
		library.callToArms,
		library.squire,
		library.knight,
		library.deedOfValor
	)
];

export const stores = [
	new Store(175, 175, library.angryMob),
	new Store(575, 175, library.general),
	new Store(175, 525, library.oldFarmer),
	new Store(575, 525, library.loot)
];

export const playerData = [
	{ color: "red", x: 165, y: 0, w: 470, h: 150, cardColor: "orange" },
	{ color: "blue", x: 650, y: 165, w: 150, h: 470, cardColor: "teal" },
	{ color: "yellow", x: 165, y: 650, w: 470, h: 150, cardColor: "white" },
	{ color: "green", x: 0, y: 165, w: 150, h: 470, cardColor: "brown" }
];

export class BoardState {
	constructor() {
		this._playerTurn = 0;
		this._running = true;
		this._players = [];
		// players?
		// locations
		// current player
		for (let i = 0; i < playerData.length; ++i) {
			this._players.push(new Player(i, playerData[i]));
		}
		this._currentPlayer = this._players[this._playerTurn];
		this._currentPlayer.startTurn();

		this._turnState = new NeutralState(this);
	}

	get turnState() {
		return this._turnState;
	}

	get players() {
		return this._players;
	}

	set turnState(value) {
		console.log(value.stateName);
		this._turnState = value;
	}

	get running() {
		return this._running;
	}

	commit() {
		this._turnState.commit();
	}

	onClick(x, y) {
		this._turnState.onClick(x, y);
	}

	activateCard(card, isActive) {
		if (this._turnState.activateCard) {
			this._turnState.activateCard(card, isActive);
		}
	}

	get currentPlayer() {
		return this._currentPlayer;
	}

	draw(ctx) {
		if (this._turnState === MasterSmithState) {
		} else {
			ctx.fillStyle = "black";
			ctx.textAlign = "left";
			ctx.fillText(this._turnState.instructions1, 10, 40);
			if (this._turnState.instructions2) {
				ctx.fillText(this._turnState.instructions2, 10, 55);
			}
			if (this._turnState.instructions3) {
				ctx.fillText(this._turnState.instructions3, 10, 70);
			}
			ctx.strokeStyle = "black";
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.font = `12px`;

			for (let i = 0; i < this._players.length; ++i) {
				this._players[i].draw(ctx);
				//	ctx.setTransform(1, 0, 0, 1, 0, 0);
			}

			for (let location of locations) {
				location.draw(ctx);
			}

			for (let store of stores) {
				store.draw(ctx);
			}
			this.endTurnButton.draw(ctx);
		}
		this.commitButton.draw(ctx);
	}

	nextTurn() {
		for (let i = 0; i < this._currentPlayer.activeCards.length; ++i) {
			this._currentPlayer.activeCards[i] = false;
		}
		this._currentPlayer.turnGold = 0;
		this._currentPlayer.turnPower = 0;
		this._playerTurn = (this._playerTurn + 1) % 4;
		this._currentPlayer = this._players[this._playerTurn];
		this._currentPlayer.startTurn();
		console.log(this._playerTurn);
	}

	endTurnButton = new Button(5, 5, 50, 15, "End Turn", () => this.nextTurn());
	commitButton = new Button(700, 5, 50, 15, "Commit", () =>
		this._turnState.commit()
	);
}
