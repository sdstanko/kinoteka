import React, { useEffect, useState } from "react";
import { arrayBuffer } from "stream/consumers";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import { movieAPI } from "../../services/MovieService";
import { userAPI } from "../../services/UserService";
import styles from './Main.module.scss'


const Main = () => {
	const {data: movies, isLoading} = movieAPI.useFetchAllMoviesQuery('', { refetchOnMountOrArgChange: true })

	return (
		<>
			<Header/>
			<Container>
				<h1 className={styles.title}>Recently uploaded movies:</h1>
				<MovieList movieData={movies} isLoading={isLoading}/>
			</Container>

		</>
	);
}
 
export default Main;