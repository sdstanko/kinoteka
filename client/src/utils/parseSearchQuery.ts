import ISearchFilter from "../types/ISearchFilter"
import ISearchObj from "../types/ISearchObj"

export const parseSearchQuery = (query: string) => {
	const searchFilterObj: ISearchFilter = {
		q: '',
		rating: 1,
		genre: {value: 'all', label: 'All'},
		country: {value: 'all', label: 'All'},
		year: {value: 'all', label: 'All'},
	}
	const params = new URLSearchParams(query)
	const iterator = params.entries()
	const queryObj: ISearchObj = Object.fromEntries(iterator)

	for (let query in queryObj) {
			
		switch (query) {
			case 'q': 
				if (queryObj.q) {
					searchFilterObj.q = queryObj.q
				}
				break;

			case 'rating': 
				if (queryObj.rating) {
					searchFilterObj.rating = queryObj.rating
				}
				break;

			case 'genre': 
				if (queryObj.genre) {
					searchFilterObj.genre = {value: queryObj.genre, label: queryObj.genre}
				}
				break;

			case 'country': 
				if (queryObj.country) {
					searchFilterObj.country = {value: queryObj.country, label: queryObj.country}
				}
				break;

			case 'year': 
				if (queryObj.year) {
					searchFilterObj.year = {value: queryObj.year, label: queryObj.year}
				}
				break;

			case 'yearFrom': 
				if (queryObj.yearFrom && queryObj.yearTo) {
					const yearRange = queryObj.yearFrom + '-' + queryObj.yearTo
					searchFilterObj.year = {value: yearRange, label: yearRange}
				}
				break; 
		}
	}

	return searchFilterObj
}