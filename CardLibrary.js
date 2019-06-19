import {
	NeutralState,
	StarveEmOutState,
	FoodCacheState,
	MillersDaughterState,
	MasterSmithState,
	CallToArmsState,
	DeedOfValorState
} from "./TurnStates.js";

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
		cardText: null
	},
	oldFarmer: {
		cost: 1,
		name: "Old Farmer",
		gold: 1,
		power: 0,
		effect: null,
		afterAttack: "defend",
		cardText: null
	},
	general: {
		cost: 6,
		name: "General",
		gold: 3,
		power: 3,
		effect: undefined /*-1 per angry mob*/,
		afterAttack: "defend",
		cardText: null
	},
	starvation: {
		cost: 0,
		name: "Starvation",
		gold: -1,
		power: -1,
		effect: null,
		afterAttack: "discard",
		cardText: null
	},
	loot: {
		cost: 3,
		name: "Loot",
		gold: 2,
		power: 0,
		effect: null,
		afterAttack: null,
		cardText: null
	},
	//FARM CARDS
	foodCache: {
		cost: 2,
		name: "Food Cache",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, FoodCacheState, NeutralState);
		}, // Trash a starvation card - COMPLETE
		afterAttack: null,
		cardText: "Trash a starvation card"
	},
	youngFarmhand: {
		cost: 4,
		name: "Young Farmhand",
		gold: 2,
		power: 1,
		effect: null,
		afterAttack: "defend",
		cardText: null
	},
	millersDaughter: {
		cost: 5,
		name: "Miller's Daughter",
		gold: 2,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, MillersDaughterState, NeutralState);
		}, //remove an enemy card from a location - COMPLETE
		afterAttack: "discard",
		cardText: "Remove a card from a location"
	},
	starveEmOut: {
		cost: 6,
		name: "Starve 'em Out!",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, StarveEmOutState, NeutralState);
		},
		/*Each other player gains a starvation card - COMPLETE*/
		afterAttack: "discard",
		cardText: "Give each other player a starvation card"
	},
	//WORKSHOP CARDS
	boilingOil: {
		cost: 2,
		name: "Boiling Oil",
		gold: 0,
		power: 3,
		effect: null, //one use only
		afterAttack: "trash",
		cardText: "One use only"
	},
	apprentice: {
		cost: 4,
		name: "Apprentice",
		gold: 2,
		power: 2,
		effect: null,
		afterAttack: "defend",
		cardText: null
	},
	masterSmith: {
		// COMPLETE
		cost: 5,
		name: "Master Smith",
		gold: 3,
		power: 1,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, MasterSmithState, NeutralState);
		},
		afterAttack: "defend",
		cardText: "Draw a card from the discard pile"
	},
	siegeEngine: {
		cost: 6,
		name: "Siege Engine",
		gold: 0,
		power: 5,
		effect: null,
		afterAttack: "trash",
		cardText: "One use only"
	},

	//ABBEY CARDS
	friar: {
		// - COMPLETE
		cost: 3,
		name: "Friar",
		gold: 1,
		power: 1,
		effect: null,
		afterAttack: "defend",
		cardText: "Add an angry mob to your discard pile"
	},
	priest: {
		// - COMPLETE
		cost: 4,
		name: "Priest",
		gold: 2,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "A defending angry mob becomes your and is attacking"
	},
	fasting: {
		//COMPLETE
		cost: 4,
		name: "Fasting",
		gold: 0,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "Double the Strength of all Angry Mobs"
	},
	fireAndBrimstone: {
		cost: 5,
		name: "Fire and Brimstone",
		gold: 0,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "Give an Angry Mob +3 power. Sacrifice it after attacking."
	},

	//CASTLE CARDS
	callToArms: {
		cost: 4,
		name: "Call To Arms",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, CallToArmsState, NeutralState);
		}, //Draw 3 cards
		afterAttack: "discard",
		cardText: "Draw 2 Cards"
	},
	squire: {
		cost: 4,
		name: "Squire",
		gold: 1,
		power: 2,
		effect: null,
		afterAttack: "defend",
		cardText: null
	},
	knight: {
		cost: 6,
		name: "Knight",
		gold: 3,
		power: 4,
		effect: null,
		afterAttack: "defend",
		cardText: null
	},
	deedOfValor: {
		cost: 7,
		name: "Deed of Valor",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, DeedOfValorState, NeutralState);
		} /*one angry mob becomes a squire, or one squire becomes a knight*/,
		afterAttack: "defend",
		cardText: "Upgrade an Angry Mob to a Squire or a Squire to a Knight"
	}
};
