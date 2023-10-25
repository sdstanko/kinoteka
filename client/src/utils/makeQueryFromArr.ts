export const makeQueryFromArr = (arr: string[]) => {
	let queryStr = '?'
	for (let i = 0; i < arr.length; i++) {
		queryStr += `ids=${arr[i]}&`
	}

	return queryStr
}