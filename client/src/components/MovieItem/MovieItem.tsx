import React, {FC} from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../types/IMovie";
import styles from './MovieItem.module.scss'


interface MovieProps {
	movie: IMovie
}

const MovieItem: FC<MovieProps> = ({movie}) => {
	
	const navigate = useNavigate()
	const mapGenres = (genres: string[]) => {
		return genres.map(genre => genre[0].toUpperCase() + genre.slice(1)).join(', ')
	}

	return (
		<div className={styles.movieItem} onClick={() => navigate('/movie/' + movie._id)}>
			<div className={styles.movieItem__body}>
				<div className={styles.movieItem__img}>
					<img src={movie.cover}/>
				</div>
				<div className={styles.title}>{movie.title}</div>
				<div>
					{mapGenres(movie.genres)}
				</div>
			</div>
		</div>
	);
}
 
export default MovieItem;