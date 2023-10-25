import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMovie } from '../types/IMovie'


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://danijel.pro/kinoteka/api/user' }),
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (user) => ({
                url: '/registration',
                method: 'POST',
                body: user,
            }),
        }),
        loginUser: build.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
        }),
        check: build.query({
            query: () => ({
                url: '/auth',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
        getUser: build.query({
            query: (id) => ({
                url: `/getUser/${id}`,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
        toggleWatchList: build.query<boolean, string>({
            query: (ids) => ({
                url: `/toggleWatchList/${ids}`,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
        hasInWatchList: build.query<boolean, string>({
            query: (ids) => ({
                url: `/hasInWatchList/${ids}`,
                method: 'GET',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
        canEdit: build.query<boolean, string>({
            query: (ids) => ({
                url: `/canEdit/${ids}`,
                method: 'GET',
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
        fetchWatchlistIds: build.query<string[], string>({
            query: (userId) => ({
                url: `/getWatchlistIds/${userId}`,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
            }),
        }),
        uploadAvatar: build.mutation({
            query: (data) => ({
                url: '/avatar',
                method: 'POST',
                body: data,
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
                responseType: 'json',
            }),
        }),
    }),
});

export const {
	useCreateUserMutation,
	useLoginUserMutation,
	useUploadAvatarMutation,
	useCheckQuery,
	useToggleWatchListQuery,
	useHasInWatchListQuery,
	useCanEditQuery,
	useFetchWatchlistIdsQuery
} = userAPI