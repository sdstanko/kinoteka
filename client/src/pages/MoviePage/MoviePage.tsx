import React, {FC, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import { useFetchOneMovieQuery } from "../../services/MovieService";
import styles from './MoviePage.module.scss'
import Header from "../../components/Header/Header";
import { useCanEditQuery } from "../../services/UserService";
import {useAppSelector} from '../../store/hooks'
import Spinner from "../../components/UI/Spinner/Spinner";
import WatchListToggle from "../../components/UI/WatchListToggle/WatchListToggle";

type MoviePageParams = {
	id: string
}

const MoviePage: FC = () => {
	const [bothParams, setBothParams] = useState(false)
	const {id: movieId} = useParams<MoviePageParams>()
	const {data: movie, isLoading} = useFetchOneMovieQuery(movieId!)
	
	const userId = useAppSelector(store => store.user.user._id) 

	let paramsString = ''
	if (movieId && userId) {
		const paramsObj = {movieId, userId}
		const params = new URLSearchParams(paramsObj)
		paramsString = '?' + params
	}

	useEffect(() => {
		if (!movieId || !userId) {
			return
		} else {
			setBothParams(true)
		}
	}, [movieId, userId])

	const {data: canEdit} = useCanEditQuery(paramsString, {skip: !bothParams})

	const navigate = useNavigate()

	const navToEdit = () => {
		navigate('/add-movie/' + movieId)
	}

	const formatGenres = (genres: string[]) => {
		return genres.join(', ')
	}

	return (
		<>
			<Header/>
			<Container>
				{isLoading ? <Spinner/> :
					movie &&
					<div className={styles.movie}>
						<div className={styles.movieInner}>
							<div className={styles.image}>
								<img src={movie.cover} alt="" />
							</div>
							<div className={styles.body}>
								<h1 className={styles.title}>{movie.title} ({movie.release.year})</h1>
								<div className={styles.buttons}>
									<WatchListToggle
										movieId={movieId!}
										userId={userId}
									/>
									{canEdit &&
										<button 
											onClick={navToEdit} 
											className={styles.button}
										>
											<span>Edit movie</span>
											<span className={styles.button__icon}></span>
										</button>
									}

								</div>
								<div className={styles.about}>
									<div className={styles.subtitle}>About</div>
									<ul className={styles.list}>
										<li className={styles.line}>
											<span className={styles.field}>Genres</span>
											<span className={styles.value}>{formatGenres(movie.genres)}</span>
										</li>
										<li className={styles.line}>
											<span className={styles.field}>Release</span>
											<span className={styles.value}>
												{movie.release.day+'/'+movie.release.month+'/'+movie.release.year}
											</span>
										</li>
										<li className={styles.line}>
											<span className={styles.field}>Country</span>
											<span className={styles.value}>{movie.country}</span>
										</li>
										<li className={styles.line}>
											<span className={styles.field}>Duration</span>
											<span className={styles.value}>{movie.duration} min</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className={styles.subtitle}>Description</div>
						<p className={styles.description}>
							{movie.description}
						</p>
					</div>
				}
			</Container>
		</>
	);
}
 
export default MoviePage;