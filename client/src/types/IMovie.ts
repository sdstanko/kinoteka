export interface IMovie {
	_id: string,
	title: string,
	description: string,
	duration: string,
	country: string,
	release: {day: number, month: number, year: number},
	cover: string,
	genres: string[]
}