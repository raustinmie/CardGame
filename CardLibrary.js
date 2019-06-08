import { Card } from "./Card.js";
import { BoardState } from "./BoardState.js";
import { NeutralState, AttackState, FoodCacheState } from "./TurnStates.js";

function newState(boardState, isActive, ChangeTo, ElseState) {
	if (!isActive) {
		boardState.turnState = new ChangeTo(boardState);
	} else {
		boardState.turnState = new ElseState(boardState);
	}
} /*trash a starvation card*/

export const library = {
	//COMMON CARDS
	angryMob: {
		cost: 1,
		name: "Angry Mob",
		gold: 0,
		power: 1,
		effect: null,
		afterAttack: "defend",
		attackEffect: null
	},
	oldFarmer: {
		cost: 1,
		name: "Old Farmer",
		gold: 1,
		power: 0,
		effect: null,
		afterAttack: "defend",
		attackEffect: null
	},
	general: {
		cost: 6,
		name: "General",
		gold: 3,
		power: 3,
		effect: undefined /*-1 per angry mob*/,
		afterAttack: "defend",
		attackEffect: null
	},
	starvation: {
		cost: 0,
		name: "Starvation",
		gold: -1,
		power: -1,
		effect: undefined,
		afterAttack: "discard",
		attackEffect: null
	},
	loot: {
		cost: 3,
		name: "Loot",
		gold: 2,
		power: 0,
		effect: null,
		afterAttack: null,
		attackEffect: null
	},
	//FARM CARDS
	foodCache: {
		cost: 2,
		name: "Food Cache",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(
				boardState,
				isActive,
				FoodCacheState,
				NeutralState
			); /*trash a starvation card*/
		},
		afterAttack: null,
		attackEffect: null
	},
	youngFarmhand: {
		cost: 4,
		name: "Young Farmhand",
		gold: 2,
		power: 1,
		effect: null,
		afterAttack: "defend",
		attackEffect: null
	},
	millersDaughter: {
		cost: 5,
		name: "Miller's Daughter",
		gold: 2,
		power: 0, //remove an enemy card from a location
		effect: (boardState, isActive) => {
			newState(boardState, isActive, MillersDaughterState, NeutralState);
		},
		afterAttack: "discard",
		attackEffect: null
	},
	starveEmOut: {
		cost: 6,
		name: "Starve 'em Out!",
		gold: 0,
		power: 0,
		effect: () => {
			for (let i = 0; i < players.length; ++i) {
				if (i !== state.currentPlayer.playerNumber) {
					players[i].addToDiscard(library.angryMob);
				}
			}
			/*Each other player gains a starvation card*/
		},
		afterAttack: "discard",
		attackEffect: null
	},

	//WORKSHOP CARDS
	boilingOil: {
		cost: 2,
		name: "Boiling Oil",
		gold: 0,
		power: 3,
		effect: null, //one use only
		afterAttack: "trash",
		attackEffect: null
	},
	apprentice: {
		cost: 4,
		name: "Apprentice",
		gold: 2,
		power: 2,
		effect: null,
		afterAttack: "defend",
		attackEffect: null
	},
	masterSmith: {
		cost: 5,
		name: "Master Smith",
		gold: 3,
		power: 1,
		effect: undefined,
		afterAttack: "defend",
		attackEffect: null //you may draw a card from the discard pile
	},
	siegeEngine: {
		cost: 6,
		name: "Siege Engine",
		gold: 0,
		power: 5,
		effect: undefined,
		afterAttack: null,
		attackEffect: null /*single use only*/
	},

	//ABBEY CARDS
	friar: {
		cost: 3,
		name: "Friar",
		gold: 1,
		power: 1,
		effect: null,
		afterAttack: "defend",
		attackEffect: null //(boardState, isActive) => {
		// 	newState(boardState, isActive, FriarState, AttackState);
		//}addToDiscard() /*add an angry mob to your discard pile*/
	},
	priest: {
		cost: 4,
		name: "Priest",
		gold: 2,
		power: 0,
		effect: undefined,
		afterAttack: "discard",
		attackEffect: null /*a defending angry mob becomes yours and is attacking*/
	},
	fasting: {
		cost: 4,
		name: "Fasting",
		gold: 0,
		power: 0,
		effect: null,
		afterAttack: "discard",
		attackEffect: null // (boardState, isActive) => {
		// 	newState(boardState, isActive, FastingState, AttackState);
		// }
		/*double the strength of all angry mobs (cumulative)*/
	},
	fireAndBrimstone: {
		cost: 5,
		name: "Fire and Brimstone",
		gold: 0,
		power: 0,
		effect: undefined,
		afterAttack: "discard",
		attackEffect: null
		/*give one angry mob to as many players as you wish*/
	},

	//CASTLE CARDS
	callToArms: {
		cost: 3,
		name: "Call To Arms",
		gold: 0,
		power: 0,
		effect: undefined,
		afterAttack: "discard",
		attackEffect: null /*pickUpCard(2)*/
	},
	squire: {
		cost: 4,
		name: "Squire",
		gold: 1,
		power: 2,
		effect: null,
		afterAttack: "defend",
		attackEffect: null
	},
	knight: {
		cost: 6,
		name: "Knight",
		gold: 3,
		power: 4,
		effect: null,
		afterAttack: "defend",
		attackEffect: null
	},
	deedOfValor: {
		cost: 7,
		name: "Deed of Valor",
		gold: 0,
		power: 0,
		effect: undefined /*one angry mob becomes a squire, or one squire becomes a knight*/,
		afterAttack: "defend",
		attackEffect: null
	}
};
