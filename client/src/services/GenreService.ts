import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGenre } from '../types/IGenre'

export const genreAPI = createApi({
	reducerPath: 'genreAPI',
	baseQuery: fetchBaseQuery({baseUrl: 'https://danijel.pro/kinoteka/api/genre'}),
	endpoints: (build) => ({
		fetchAllGenres: build.query<IGenre[], String>({
			query: () => ({
				url: `/`,
			}),
		}),
	})
})

export const {
	useFetchAllGenresQuery
} = genreAPI