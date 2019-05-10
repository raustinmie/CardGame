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

export class Box {
	constructor(left, top, width, height) {
		this._left = left;
		this._top = top;
		this._width = width;
		this._height = height;
		this._right = left + width;
		this._bottom = top + height;
	}
	contains(clickX, clickY) {
		return (
			clickX >= this.left &&
			clickX < this.right &&
			clickY >= this.top &&
			clickY < this.bottom
		);
	}

	get right() {
		return this._right;
	}
	get left() {
		return this._left;
	}
	get top() {
		return this._top;
	}
	get bottom() {
		return this._bottom;
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}
}
