import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie } from '../types/IMovie'

export const movieAPI = createApi({
    reducerPath: 'movieAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://danijel.pro/kinoteka/api/movie' }),
    endpoints: (build) => ({
        fetchAllMovies: build.query<IMovie[], string>({
            query: () => '',
        }),
        fetchOneMovie: build.query<IMovie, string>({
            query: (id) => ({
                url: `/id/${id}`,
            }),
        }),
        fetchFilteredMovies: build.query<IMovie[], string>({
            query: (query) => ({
                url: `/search/${query}`,
            }),
        }),
        fetchAllByIds: build.query<IMovie[], string>({
            query: (idsQuery) => ({
                url: `findByAllIds/${idsQuery}`,
            }),
        }),
        createMovie: build.mutation({
            query: (movie) => ({
                url: '/',
                method: 'POST',
                body: movie,
                files: movie.cover,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
                responseType: 'json',
            }),
        }),
        uploadCover: build.mutation({
            query: (data) => ({
                url: '/cover',
                method: 'POST',
                body: data,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
                responseType: 'json',
            }),
        }),
        updateMovie: build.mutation({
            query: (movie) => ({
                url: `/${movie._id}`,
                method: 'POST',
                body: movie,
                files: movie.cover,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
    }),
});

export const {
	useFetchAllMoviesQuery,
	useFetchOneMovieQuery,
	useFetchFilteredMoviesQuery,
	useFetchAllByIdsQuery,
	useCreateMovieMutation,
	useUploadCoverMutation,
	useUpdateMovieMutation
} = movieAPI