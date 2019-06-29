import { StarveEmOutState } from "./StarveEmOutState.js";
import { FoodCacheState } from "./FoodCacheState.js";
import { MillersDaughterState } from "./MillersDaughterState.js";
import { MasterSmithState } from "./MasterSmithState.js";
import { CallToArmsState } from "./CallToArmsState.js";
import { DeedOfValorState } from "./DeedOfValorState.js";
import { ReinforcementsState } from "./ReinforcementsState.js";
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
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	oldFarmer: {
		cost: 1,
		name: "Old Farmer",
		gold: 1,
		power: 0,
		effect: null,
		afterAttack: "defend",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	reinforcements: {
		cost: 6,
		name: "Reinforcements",
		name2: "",
		gold: 0,
		power: 0,
		effect: (boardState, isActive) => {
			newState(boardState, isActive, ReinforcementsState, NeutralState);
		},
		afterAttack: "discard",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	starvation: {
		cost: 0,
		name: "Starvation",
		name2: null,
		gold: -1,
		power: -1,
		effect: null,
		afterAttack: "discard",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	withdraw: {
		cost: 3,
		name: "Loot",
		name2: null,
		gold: 2,
		power: 0,
		effect: null,
		afterAttack: "discard",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
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
		cardText3: "",
		cardText4: ""
	},
	youngFarmhand: {
		cost: 4,
		name: "Young Farmhand",
		name2: null,
		gold: 2,
		power: 1,
		effect: null,
		afterAttack: "defend",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
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
		cardText4: ""
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
		cardText4: ""
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
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	apprentice: {
		cost: 4,
		name: "Apprentice",
		name2: null,
		gold: 2,
		power: 2,
		effect: null,
		afterAttack: "defend",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
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
		cardText4: ""
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
		cardText2: "",
		cardText3: "",
		cardText4: ""
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
		cardText4: ""
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
		cardText4: ""
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
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	squire: {
		cost: 4,
		name: "Squire",
		name2: null,
		gold: 1,
		power: 2,
		effect: null,
		afterAttack: "defend",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
	},
	knight: {
		cost: 6,
		name: "Knight",
		name2: null,
		gold: 3,
		power: 4,
		effect: null,
		afterAttack: "defend",
		cardText: "",
		cardText2: "",
		cardText3: "",
		cardText4: ""
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
