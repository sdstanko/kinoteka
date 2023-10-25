export default interface ISearchFilter {
	q: string
	rating: number
	genre: {value: string, label: string}
	country: {value: string, label: string}
	year: {value: string, label: string}
}