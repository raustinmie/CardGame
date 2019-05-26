import { Card } from "./Card.js";
import { BoardState } from "./BoardState.js";

export const library = {
	//COMMON CARDS
	angryMob: { cost: 1, name: "Angry Mob", gold: 0, power: 1, effect: null },
	oldFarmer: { cost: 1, name: "Old Farmer", gold: 1, power: 0, effect: null },
	general: {
		cost: 6,
		name: "General",
		gold: 3,
		power: 3,
		effect: undefined /*-1 per angry mob*/
	},
	starvation: {
		cost: 0,
		name: "Starvation",
		gold: -1,
		power: -1,
		effect: null
	},
	loot: { cost: 3, name: "Loot", gold: 2, power: 0, effect: null },
	//FARM CARDS
	foodCache: {
		cost: 2,
		name: "Food Cache",
		gold: 0,
		power: 0,
		effect: state => {
			state = new FoodCacheState();
		} /*trash a starvation card*/
	},
	youngFarmhand: {
		cost: 4,
		name: "Young Farmhand",
		gold: 2,
		power: 1,
		effect: null
	},
	millersDaughter: {
		cost: 5,
		name: "Miller's Daughter",
		gold: 2,
		power: 0 //remove an enemy card from a location
	},
	starveEmOut: {
		cost: 6,
		name: "Starve 'em Out!",
		gold: 0,
		power: 0,
		effect: undefined
		/*Each other player gains a starvation card*/
	},

	//WORKSHOP CARDS
	boilingOil: {
		cost: 2,
		name: "Boiling Oil",
		gold: 0,
		power: 3,
		effect: null //one use only
	},
	apprentice: { cost: 4, name: "Apprentice", gold: 2, power: 2, effect: null },
	masterSmith: {
		cost: 5,
		name: "Master Smith",
		gold: 3,
		power: 1,
		effect: undefined //you may draw a card from the discard pile
	},
	siegeEngine: {
		cost: 6,
		name: "Siege Engine",
		gold: 0,
		power: 5,
		effect: undefined /*single use only*/
	},

	//ABBEY CARDS
	friar: {
		cost: 3,
		name: "Friar",
		gold: 1,
		power: 1,
		effect: undefined //addToDiscard() /*add an angry mob to your discard pile*/
	},
	priest: {
		cost: 4,
		name: "Priest",
		gold: 2,
		power: 0,
		effect: undefined /*a defending angry mob becomes yours and is attacking*/
	},
	fasting: {
		cost: 4,
		name: "Fasting",
		gold: 0,
		power: 0,
		effect: undefined
		/*double the strength of all angry mobs (can cumulate)*/
	},
	fireAndBrimstone: {
		cost: 5,
		name: "Fire and Brimstone",
		gold: 0,
		power: 0,
		effect: undefined
		/*give one angry mob to as many players as you wish*/
	},

	//CASTLE CARDS
	callToArms: {
		cost: 3,
		name: "Call To Arms",
		gold: 0,
		power: 0,
		effect: undefined /*pickUpCard(2)*/
	},
	squire: { cost: 4, name: "Squire", gold: 1, power: 2, effect: null },
	knight: { cost: 6, name: "Knight", gold: 3, knight: 4, effect: null },
	deedOfValor: {
		cost: 7,
		name: "Deed of Valor",
		gold: 0,
		power: 0,
		effect: undefined /*one angry mob becomes a squire, or one squire becomes a knight*/
	}
};
