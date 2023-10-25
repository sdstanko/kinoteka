export default function createRangeOfNumbers(value: number, start: number) {
	return [...Array(value)].map((el, i) => (start + i))
}