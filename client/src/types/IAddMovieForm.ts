export interface IAddMovieForm {
	title: string
	description: string
	duration: string
	genres: string[]
	country: string
	release: {day: number, month: number, year: number}
	cover: File | null | string
}