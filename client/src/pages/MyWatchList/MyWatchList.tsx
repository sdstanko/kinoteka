import React, { useEffect, useState } from "react";
import { consumers } from "stream";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import { movieAPI } from "../../services/MovieService";
import { userAPI } from "../../services/UserService";
import { useAppSelector } from "../../store/hooks";
import { makeQueryFromArr } from "../../utils/makeQueryFromArr";
import styles from './MyWatchList.module.scss'


const MyWatchList = () => {
	const userId = useAppSelector(store => store.user.user._id) 
	const {data: movieIds, isLoading: isLoadingIds, isFetching} = userAPI.useFetchWatchlistIdsQuery(userId, { refetchOnMountOrArgChange: true })
	const [fetchMovies, result] = movieAPI.endpoints.fetchAllByIds.useLazyQuery()
	console.log(isFetching, result.isFetching)
	useEffect(() => {
		if (movieIds != undefined) {
			const query = makeQueryFromArr(movieIds)
			fetchMovies(query)
		}
	}, [movieIds])
	
	return (
		<>
			<Header/>
			<Container>
				<h1 className={styles.title}>Movies from watchlist:</h1>
				<MovieList movieData={result.data} isLoading={result.isFetching || isFetching}/>
			</Container>

		</>
	);
}
 
export default MyWatchList;