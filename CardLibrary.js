import { Card } from "./Card.js";
import { BoardState } from "./BoardState.js";

function minusPower(value, currentPlayer) {
	currentPlayer.turnPower -= value;
}

function minusGold(value, currentPlayer) {
	currentPlayer.turnGold -= value;
}

function gainPower(value, currentPlayer) {
	currentPlayer.turnPower += value;
}

function gainGold(value, currentPlayer) {
	currentPlayer.turnGold += value;
}

// function gainPower(value) {
// 	return function(currentPlayer) {
// 		return (currentPlayer.power += value);
// 	};
//}

export const library = {
	//COMMON CARDS
	angryMob: new Card(1, "Angry Mob", currentPlayer => {
		gainPower(1, currentPlayer);
	}),
	oldFarmer: new Card(1, "Old Farmer", currentPlayer => {
		gainGold(1, currentPlayer);
	}),
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
	foodCache: new Card(2, "Food Cache", "?" /*trash a starvation card*/),
	youngFarmhand: new Card(4, "Young Farmhand", currentPlayer => {
		gainPower(1);
		gainGold(2);
	}),
	starveEmOut: new Card(
		6,
		"Starve 'em Out!",
		"?" /*Each other player gains a starvation card*/
	),

	//WORKSHOP CARDS
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
