export function roll(min, max) {
	if (max === undefined) {
		max = min;
		min = 0;
	}
	return Math.floor(Math.random() * (max - min) + min);
}

export function shuffle(array, cap) {
	if (cap === undefined) {
		cap = array.length;
	}

	for (let i = 0; i < array.length - 2 && i < cap; ++i) {
		const rand = roll(i, array.length);
		// swap
		const tmp = array[rand];
		array[rand] = array[i];
		array[i] = tmp;
	}

	return array;
}
