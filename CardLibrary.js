import { Card } from "./Card.js";
import { BoardState } from "./BoardState.js";

//TODO: revert to gold and power attributes instead of

export const library = {
	//COMMON CARDS
	angryMob: new Card(1, "Angry Mob", 0, 1, null),
	oldFarmer: new Card(1, "Old Farmer", 1, 0, null),
	general: new Card(6, "General", currentPlayer => {
		gainGold(4, currentPlayer);
		gainPower(4 /*-1 per angry mob*/, currentPlayer);
	}),
	starvation: new Card(0, "Starvation", currentPlayer => {
		minusGold(1, currentPlayer);
		minusPower(1, currentPlayer);
	}),
	loot: new Card(3, "Loot", currentPlayer => {
		gainGold(2, currentPlayer);
	}),
	//FARM CARDS
	foodCache: new Card(2, "Food Cache" /*trash a starvation card*/),
	youngFarmhand: new Card(4, "Young Farmhand", currentPlayer => {
		gainPower(1);
		gainGold(2);
	}),
	millersDaughter: new Card(5, "Miller's Daughter", currentPlayer => {
		gainGold(2);
		//remove an enemy card from a location
	}),
	starveEmOut: new Card(
		6,
		"Starve 'em Out!",
		"?" /*Each other player gains a starvation card*/
	),

	//WORKSHOP CARDS
	boilingOil: new Card(2, "Boiling Oil", currentPlayer => {
		gainPower(3); //one use only
	}),
	apprentice: new Card(4, "Apprentice", currentPlayer => {
		gainGold(2);
		gainPower(2);
	}),
	masterSmith: new Card(5, "Master Smith", currentPlayer => {
		gainGold(3);
		gainPower(1); //you may draw a card from the discard pile
	}),
	siegeEngine: new Card(
		6,
		"Siege Engine",
		currentPlayer => {
			gainPower(5);
		} /*single use only*/
	),

	//ABBEY CARDS
	friar: new Card(3, "Friar", currentPlayer => {
		gainGold(1);
		gainPower(1);
		/*add an angry mob to your discard pile*/
	}),
	priest: new Card(4, "Priest", currentPlayer => {
		gainGold(2); /*a defending angry mob becomes yours and is attacking*/
	}),
	fasting: new Card(
		4,
		"Fasting",
		"?" /*double the strength of all angry mobs (can cumulate)*/
	),
	fireAndBrimstone: new Card(
		5,
		"Fire and Brimstone",
		"?" /*give one angry mob to as many players as you wish*/
	),

	//CASTLE CARDS
	callToArms: new Card(3, "Call To Arms", "?" /*pickUpCard(2)*/),
	squire: new Card(4, "Squire", currentPlayer => {
		gainPower(2);
		gainGold(1);
	}),
	knight: new Card(6, "Knight", currentPlayer => {
		gainPower(4);
		gainGold(3);
	}),
	deedOfValor: new Card(
		7,
		"Deed of Valor",
		"?" /*one angry mob becomes a squire, or one squire becomes a knight*/
	)
};
