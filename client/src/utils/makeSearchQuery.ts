import ISearchFilter from "../types/ISearchFilter"
import ISearchObj from "../types/ISearchObj"

export const makeSearchQuery = (searchFilter: ISearchFilter, setQuery?: (params: string) => void) => {
	const searchObj: ISearchObj = {}
	if (searchFilter.q) {
		searchObj.q = searchFilter.q
	}
	searchObj.rating = searchFilter.rating
	let key: keyof ISearchFilter
	for (key in searchFilter) {
		if (key === 'rating') continue
		if (key === 'q') continue
		if (searchFilter[key].value === 'all') continue
		if (key === 'genre' || key === 'country') {
			searchObj[key] = searchFilter[key].value
		}
		if (key === 'year' && searchFilter.year.value !== 'all') {
			let arr = searchFilter[key].value.split('-')
			if (arr.length === 2) {
				searchObj.yearFrom = arr[0]
				searchObj.yearTo = arr[1]
			} else {
				searchObj.year = arr[0]
			}
		}
	}

	const params = new URLSearchParams(Object.entries(searchObj))
	return '?' + params
}