import React, {FC, useEffect} from "react";
import { IMovie } from "../../types/IMovie";
import MovieItem from "../MovieItem/MovieItem";
import MovieItemSearch from "../MovieItemSearch/MovieItemSearch";
import Spinner from "../UI/Spinner/Spinner";
import styles from './MovieList.module.scss'

interface MovieListProps {
	movieData?: IMovie[]
	isLoading: boolean
	isSearch?: boolean
	additionalClassName?: string
}	

const MovieList: FC<MovieListProps> = ({movieData, isLoading, isSearch, additionalClassName}) => {
	return (
		<div className={[styles.movieList, additionalClassName].join(' ')}>
			{isLoading ? <Spinner/> :
				movieData?.map((movie, i) => 
					isSearch ?
					<MovieItemSearch key={i} movie={movie}/>
					:
					<MovieItem key={i} movie={movie} />
				)
			}
		</div>
	);
}

export default MovieList;