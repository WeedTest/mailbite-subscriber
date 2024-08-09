export default class Random {
	public static integer(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min) + min);
	}

	public static array<T>(array: T[]): T {
		if (array.length === 0) throw new Error('Array is empty');
		return array[Math.floor(Math.random() * array.length)];
	}
}
