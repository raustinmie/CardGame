import {
	StarveEmOutState,
	FoodCacheState,
	MillersDaughterState,
	MasterSmithState,
	CallToArmsState,
	DeedOfValorState
} from "./TurnStates.js";
import { NeutralState } from "./NeutralState.js";

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
		name2: null,
		gold: 0,
		power: 1,
		effect: null,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	oldFarmer: {
		cost: 1,
		name: "Old Farmer",
		gold: 1,
		power: 0,
		effect: null,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	general: {
		cost: 6,
		name: "General",
		name2: null,
		gold: 3,
		power: 3,
		effect: undefined /*-1 per angry mob*/,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	starvation: {
		cost: 0,
		name: "Starvation",
		name2: null,
		gold: -1,
		power: -1,
		effect: null,
		afterAttack: "discard",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	loot: {
		cost: 3,
		name: "Loot",
		name2: null,
		gold: 2,
		power: 0,
		effect: null,
		afterAttack: null,
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	//FARM CARDS
	foodCache: {
		cost: 2,
		name: "Food Cache",
		name2: null,
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, FoodCacheState, NeutralState);
		}, // Trash a starvation card - COMPLETE
		afterAttack: null,
		cardText: "Trash a",
		cardText2: "starvation card",
		cardText3: null,
		cardText4: null
	},
	youngFarmhand: {
		cost: 4,
		name: "Young Farmhand",
		name2: null,
		gold: 2,
		power: 1,
		effect: null,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	millersDaughter: {
		cost: 5,
		name: "Miller's",
		name2: "Daughter",
		gold: 2,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, MillersDaughterState, NeutralState);
		}, //remove an enemy card from a location - COMPLETE
		afterAttack: "discard",
		cardText: "Remove a ",
		cardText2: "card from",
		cardText3: "a location",
		cardText4: null
	},
	starveEmOut: {
		cost: 6,
		name: "Starve",
		name2: "'em Out!",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, StarveEmOutState, NeutralState);
		},
		/*Each other player gains a starvation card - COMPLETE*/
		afterAttack: "discard",
		cardText: "Give each",
		cardText2: "other player a",
		cardText3: "starvation card",
		cardText4: null
	},
	//WORKSHOP CARDS
	boilingOil: {
		cost: 2,
		name: "Boiling Oil",
		name2: null,
		gold: 0,
		power: 3,
		effect: null, //one use only
		afterAttack: "trash",
		cardText: "One use only",
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	apprentice: {
		cost: 4,
		name: "Apprentice",
		name2: null,
		gold: 2,
		power: 2,
		effect: null,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	masterSmith: {
		// COMPLETE
		cost: 5,
		name: "Master Smith",
		name2: null,
		gold: 3,
		power: 1,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, MasterSmithState, NeutralState);
		},
		afterAttack: "defend",
		cardText: "Draw a card",
		cardText2: "from the",
		cardText3: "discard pile",
		cardText4: null
	},
	siegeEngine: {
		cost: 6,
		name: "Siege Engine",
		name2: null,
		gold: 0,
		power: 5,
		effect: null,
		afterAttack: "trash",
		cardText: "One use only",
		cardText2: null,
		cardText3: null,
		cardText4: null
	},

	//ABBEY CARDS
	friar: {
		// - COMPLETE
		cost: 3,
		name: "Friar",
		name2: null,
		gold: 1,
		power: 1,
		effect: null,
		afterAttack: "defend",
		cardText: "Add an angry mob",
		cardText2: "to your discard",
		cardText3: "pile after",
		cardText4: "attacking"
	},
	priest: {
		// - COMPLETE
		cost: 4,
		name: "Priest",
		name2: null,
		gold: 2,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "A defending angry",
		cardText2: "mob becomes yours",
		cardText3: "and is attacking",
		cardText4: null
	},
	fasting: {
		//COMPLETE
		cost: 4,
		name: "Fasting",
		name2: null,
		gold: 0,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "Double the power",
		cardText2: "of all Angry Mobs",
		cardText3: "this turn",
		cardText4: null
	},
	fireAndBrimstone: {
		cost: 5,
		name: "Fire and",
		name2: "Brimstone",
		gold: 0,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "Give an Angry Mob",
		cardText2: "+3 power.",
		cardText3: "Sacrifice it",
		cardText4: "after attacking."
	},

	//CASTLE CARDS
	callToArms: {
		cost: 4,
		name: "Call To Arms",
		name2: null,
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, CallToArmsState, NeutralState);
		}, //Draw 3 cards
		afterAttack: "discard",
		cardText: "Draw 2 Cards",
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	squire: {
		cost: 4,
		name: "Squire",
		name2: null,
		gold: 1,
		power: 2,
		effect: null,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	knight: {
		cost: 6,
		name: "Knight",
		name2: null,
		gold: 3,
		power: 4,
		effect: null,
		afterAttack: "defend",
		cardText: null,
		cardText2: null,
		cardText3: null,
		cardText4: null
	},
	deedOfValor: {
		cost: 7,
		name: "Deed of Valor",
		name2: null,
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, DeedOfValorState, NeutralState);
		} /*one angry mob becomes a squire, or one squire becomes a knight*/,
		afterAttack: "defend",
		cardText: "Upgrade an Angry",
		cardText2: "Mob to a Squire",
		cardText3: "or a Squire",
		cardText4: "to a Knight"
	}
};
